import { getAllNotes } from './data/notes.js';
import { generateQuestions } from './data/questions.js';

let currentUser = JSON.parse(localStorage.getItem('ecm_current_user')) || null;
let currentSection = 'home';
let quizState = {
  questions: [],
  currentIndex: 0,
  answers: {},
  markedForReview: [],
  startTime: null,
  selectedLanguage: '',
  selectedTopic: '',
  selectedDifficulty: '',
  totalQuestions: 10
};

const app = document.getElementById('app');

function renderApp() {
  app.innerHTML = `
    ${renderNavbar()}
    <div class="flex">
      ${currentUser ? renderSidebar() : ''}
      <main class="flex-1 ${currentUser ? 'ml-64' : ''} min-h-screen">
        ${renderCurrentSection()}
      </main>
    </div>
    ${renderModals()}
  `;

  attachEventListeners();
  if (window.hljs) {
    document.querySelectorAll('pre code').forEach((block) => {
      window.hljs.highlightElement(block);
    });
  }
}

function renderNavbar() {
  return `
    <nav class="bg-slate-800 border-b border-slate-700 fixed w-full z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2 cursor-pointer" onclick="navigateTo('home')">
              <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <span class="text-xl font-bold text-white">E-Code Mitra</span>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            ${currentUser ? `
              <button onclick="navigateTo('notes')" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                Notes
              </button>
              <button onclick="navigateTo('quiz-setup')" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                Quiz
              </button>
              <button onclick="navigateTo('dashboard')" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                Dashboard
              </button>
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  ${currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span class="text-sm font-medium text-white">${currentUser.name}</span>
                <button onclick="logout()" class="ml-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm">
                  Logout
                </button>
              </div>
            ` : `
              <button onclick="navigateTo('login')" class="px-4 py-2 text-slate-300 hover:text-white transition">
                Login
              </button>
              <button onclick="navigateTo('signup')" class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white rounded-lg transition">
                Sign Up
              </button>
            `}
          </div>
        </div>
      </div>
    </nav>
  `;
}

function renderSidebar() {
  return `
    <aside class="fixed left-0 top-16 h-full w-64 bg-slate-800 border-r border-slate-700 overflow-y-auto">
      <div class="p-6 space-y-6">
        <div>
          <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Navigation</h3>
          <nav class="space-y-2">
            ${sidebarLink('home', 'Home', homeIcon)}
            ${sidebarLink('notes', 'Notes', notesIcon)}
            ${sidebarLink('quiz-setup', 'Quiz', quizIcon)}
            ${sidebarLink('dashboard', 'Dashboard', dashboardIcon)}
          </nav>
        </div>

        <div>
          <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Access</h3>
          <div class="space-y-2">
            ${quickAccessCard('Total Quizzes', getQuizHistory().length, '📝')}
            ${quickAccessCard('Avg Score', calculateAverageScore() + '%', '⭐')}
          </div>
        </div>
      </div>
    </aside>
  `;
}

function sidebarLink(section, label, icon) {
  const isActive = currentSection === section;
  return `
    <button onclick="navigateTo('${section}')"
      class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
        isActive
          ? 'bg-indigo-500 text-white'
          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
      }">
      ${icon}
      <span class="font-medium">${label}</span>
    </button>
  `;
}

function quickAccessCard(label, value, emoji) {
  return `
    <div class="bg-slate-700 rounded-lg p-3">
      <div class="flex items-center justify-between">
        <span class="text-sm text-slate-400">${label}</span>
        <span class="text-lg">${emoji}</span>
      </div>
      <div class="text-xl font-bold text-white mt-1">${value}</div>
    </div>
  `;
}

const homeIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>';
const notesIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>';
const quizIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>';
const dashboardIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>';

function renderCurrentSection() {
  const sections = {
    'home': renderHome,
    'notes': renderNotes,
    'quiz-setup': renderQuizSetup,
    'quiz-runner': renderQuizRunner,
    'quiz-results': renderQuizResults,
    'dashboard': renderDashboard,
    'login': renderLogin,
    'signup': renderSignup
  };

  return sections[currentSection] ? sections[currentSection]() : renderHome();
}

function renderHome() {
  const quotes = [
    "The best way to predict the future is to create it.",
    "Code is like humor. When you have to explain it, it's bad.",
    "First, solve the problem. Then, write the code.",
    "Programming isn't about what you know; it's about what you can figure out.",
    "The only way to learn a new programming language is by writing programs in it."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return `
    <div class="pt-16">
      <div class="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 overflow-hidden">
        <div class="absolute inset-0 bg-black opacity-20"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="text-center">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
              Welcome to E-Code Mitra
            </h1>
            <p class="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Master every programming language with comprehensive notes, interactive quizzes, and personalized learning paths
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              ${currentUser ? `
                <button onclick="navigateTo('notes')" class="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition transform hover:scale-105 shadow-xl">
                  Explore Notes
                </button>
                <button onclick="navigateTo('quiz-setup')" class="px-8 py-4 bg-emerald-500 text-white rounded-lg font-semibold text-lg hover:bg-emerald-600 transition transform hover:scale-105 shadow-xl">
                  Start Quiz
                </button>
              ` : `
                <button onclick="navigateTo('signup')" class="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition transform hover:scale-105 shadow-xl">
                  Get Started Free
                </button>
                <button onclick="navigateTo('login')" class="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-600 transition transform hover:scale-105">
                  Login
                </button>
              `}
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="bg-slate-800 rounded-2xl p-8 mb-16 border border-slate-700">
          <div class="flex items-center space-x-3 mb-4">
            <span class="text-3xl">💡</span>
            <h3 class="text-xl font-semibold text-white">Quote of the Moment</h3>
          </div>
          <p class="text-lg text-slate-300 italic">"${randomQuote}"</p>
        </div>

        <h2 class="text-3xl font-bold text-white mb-8 text-center">Learn Everything You Need</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          ${featureCard('📚', 'Comprehensive Notes', 'Notes for 30+ languages and technologies')}
          ${featureCard('🎯', 'Interactive Quizzes', 'Test your knowledge with adaptive quizzes')}
          ${featureCard('📊', 'Progress Tracking', 'Monitor your learning journey')}
          ${featureCard('🏆', 'Detailed Analysis', 'Get insights on weak areas')}
        </div>

        <h2 class="text-3xl font-bold text-white mb-8 text-center">Popular Languages</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          ${languageCard('Python', '🐍')}
          ${languageCard('JavaScript', '⚡')}
          ${languageCard('Java', '☕')}
          ${languageCard('C++', '⚙️')}
          ${languageCard('React', '⚛️')}
          ${languageCard('Node.js', '🟢')}
        </div>
      </div>
    </div>
  `;
}

function featureCard(icon, title, description) {
  return `
    <div class="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-indigo-500 transition transform hover:scale-105">
      <div class="text-4xl mb-4">${icon}</div>
      <h3 class="text-xl font-semibold text-white mb-2">${title}</h3>
      <p class="text-slate-400">${description}</p>
    </div>
  `;
}

function languageCard(name, icon) {
  return `
    <div class="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-indigo-500 transition transform hover:scale-105 cursor-pointer text-center">
      <div class="text-4xl mb-2">${icon}</div>
      <div class="text-white font-medium">${name}</div>
    </div>
  `;
}

function renderLogin() {
  return `
    <div class="pt-16 min-h-screen flex items-center justify-center px-4">
      <div class="max-w-md w-full">
        <div class="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <h2 class="text-3xl font-bold text-white mb-6 text-center">Welcome Back</h2>
          <form onsubmit="handleLogin(event)" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input type="email" id="login-email" required
                class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input type="password" id="login-password" required
                class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            <button type="submit"
              class="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold rounded-lg transition transform hover:scale-105">
              Login
            </button>
          </form>
          <p class="mt-6 text-center text-slate-400">
            Don't have an account?
            <button onclick="navigateTo('signup')" class="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderSignup() {
  return `
    <div class="pt-16 min-h-screen flex items-center justify-center px-4">
      <div class="max-w-md w-full">
        <div class="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <h2 class="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>
          <form onsubmit="handleSignup(event)" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <input type="text" id="signup-name" required
                class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input type="email" id="signup-email" required
                class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input type="password" id="signup-password" required
                class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            <button type="submit"
              class="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold rounded-lg transition transform hover:scale-105">
              Sign Up
            </button>
          </form>
          <p class="mt-6 text-center text-slate-400">
            Already have an account?
            <button onclick="navigateTo('login')" class="text-indigo-400 hover:text-indigo-300 font-medium">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderNotes() {
  if (!currentUser) {
    navigateTo('login');
    return '';
  }

  const notes = getAllNotes();
  const languages = [...new Set(notes.map(n => n.language))];

  return `
    <div class="pt-16 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-8">Programming Notes</h1>

        <div class="mb-8 flex flex-col md:flex-row gap-4">
          <input type="text" id="search-notes" placeholder="Search notes..."
            class="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            oninput="filterNotes()">
          <select id="filter-language" onchange="filterNotes()"
            class="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">All Languages</option>
            ${languages.map(lang => `<option value="${lang}">${lang}</option>`).join('')}
          </select>
        </div>

        <div id="notes-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${notes.map(note => renderNoteCard(note)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderNoteCard(note) {
  return `
    <div class="note-card bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-indigo-500 transition transform hover:scale-105 cursor-pointer"
      data-language="${note.language}" data-tags="${note.tags.join(',')}" data-title="${note.title.toLowerCase()}">
      <div class="flex items-center justify-between mb-4">
        <span class="px-3 py-1 bg-indigo-500 text-white rounded-full text-xs font-semibold">${note.language}</span>
        <button onclick="openNoteModal(${note.id})" class="text-indigo-400 hover:text-indigo-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </button>
      </div>
      <h3 class="text-xl font-semibold text-white mb-2">${note.title}</h3>
      <p class="text-slate-400 text-sm mb-4">${note.summary}</p>
      <div class="flex flex-wrap gap-2">
        ${note.tags.map(tag => `<span class="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">${tag}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderQuizSetup() {
  if (!currentUser) {
    navigateTo('login');
    return '';
  }

  const languages = ['Python', 'JavaScript', 'Java', 'C++', 'C', 'HTML', 'CSS', 'React', 'Node.js', 'SQL'];
  const topics = ['Basics', 'Data Structures', 'Algorithms', 'OOP', 'Advanced'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  return `
    <div class="pt-16 min-h-screen">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-8">Setup Your Quiz</h1>

        <div class="bg-slate-800 rounded-2xl p-8 border border-slate-700 space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Select Language</label>
            <select id="quiz-language"
              class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Choose a language</option>
              ${languages.map(lang => `<option value="${lang}">${lang}</option>`).join('')}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Select Topic</label>
            <select id="quiz-topic"
              class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Choose a topic</option>
              ${topics.map(topic => `<option value="${topic}">${topic}</option>`).join('')}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Select Difficulty</label>
            <select id="quiz-difficulty"
              class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Choose difficulty</option>
              ${difficulties.map(diff => `<option value="${diff}">${diff}</option>`).join('')}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Number of Questions</label>
            <input type="number" id="quiz-count" value="10" min="5" max="20"
              class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          </div>

          <button onclick="startQuiz()"
            class="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg transition transform hover:scale-105 text-lg">
            Generate Quiz
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderQuizRunner() {
  if (!currentUser || quizState.questions.length === 0) {
    navigateTo('quiz-setup');
    return '';
  }

  const currentQuestion = quizState.questions[quizState.currentIndex];
  const progress = ((quizState.currentIndex + 1) / quizState.questions.length) * 100;
  const selectedAnswer = quizState.answers[quizState.currentIndex];
  const isMarked = quizState.markedForReview.includes(quizState.currentIndex);

  return `
    <div class="pt-16 min-h-screen">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold text-white">
              Question ${quizState.currentIndex + 1} of ${quizState.questions.length}
            </h2>
            <div id="timer" class="text-xl font-semibold text-emerald-400"></div>
          </div>
          <div class="w-full bg-slate-700 rounded-full h-2">
            <div class="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
          </div>
        </div>

        <div class="bg-slate-800 rounded-2xl p-8 border border-slate-700 mb-6">
          <h3 class="text-xl text-white mb-6">${currentQuestion.question}</h3>
          <div class="space-y-3">
            ${currentQuestion.options.map((option, idx) => `
              <button onclick="selectAnswer(${idx})"
                class="w-full text-left px-6 py-4 rounded-lg border-2 transition ${
                  selectedAnswer === idx
                    ? 'border-indigo-500 bg-indigo-500 bg-opacity-20 text-white'
                    : 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500'
                }">
                <span class="font-semibold mr-3">${String.fromCharCode(65 + idx)}.</span> ${option}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="flex flex-wrap gap-4 justify-between items-center">
          <div class="flex gap-3">
            <button onclick="previousQuestion()" ${quizState.currentIndex === 0 ? 'disabled' : ''}
              class="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button onclick="nextQuestion()" ${quizState.currentIndex === quizState.questions.length - 1 ? 'disabled' : ''}
              class="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>

          <div class="flex gap-3">
            <button onclick="toggleMarkForReview()"
              class="px-6 py-3 ${isMarked ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-slate-700 hover:bg-slate-600'} text-white rounded-lg transition">
              ${isMarked ? 'Marked' : 'Mark for Review'}
            </button>
            <button onclick="submitQuiz()"
              class="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg font-semibold transition">
              Submit Quiz
            </button>
          </div>
        </div>

        <div class="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <h4 class="text-sm font-semibold text-slate-400 mb-3">Question Navigation</h4>
          <div class="grid grid-cols-10 gap-2">
            ${quizState.questions.map((_, idx) => `
              <button onclick="jumpToQuestion(${idx})"
                class="w-10 h-10 rounded-lg font-semibold transition ${
                  idx === quizState.currentIndex
                    ? 'bg-indigo-500 text-white'
                    : quizState.answers[idx] !== undefined
                      ? 'bg-emerald-500 text-white'
                      : quizState.markedForReview.includes(idx)
                        ? 'bg-yellow-500 text-white'
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }">
                ${idx + 1}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderQuizResults() {
  if (!currentUser) {
    navigateTo('login');
    return '';
  }

  const results = calculateResults();
  const showConfetti = results.percentage >= 80;

  if (showConfetti) {
    setTimeout(() => launchConfetti(), 300);
  }

  return `
    <div class="pt-16 min-h-screen">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-white mb-4">Quiz Results</h1>
          <div class="text-6xl mb-4">${results.percentage >= 80 ? '🎉' : results.percentage >= 60 ? '👏' : '📚'}</div>
          <div class="text-5xl font-bold ${results.percentage >= 80 ? 'text-emerald-400' : results.percentage >= 60 ? 'text-blue-400' : 'text-yellow-400'} mb-2">
            ${results.percentage}%
          </div>
          <p class="text-xl text-slate-400">
            ${results.correct} out of ${results.total} correct
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          ${statsCard('✅', 'Correct', results.correct, 'emerald')}
          ${statsCard('❌', 'Wrong', results.wrong, 'red')}
          ${statsCard('⏱️', 'Time Taken', formatTime(results.timeTaken), 'blue')}
        </div>

        <div class="bg-slate-800 rounded-2xl p-8 border border-slate-700 mb-8">
          <h2 class="text-2xl font-bold text-white mb-6">Question Review</h2>
          <div class="space-y-6">
            ${quizState.questions.map((q, idx) => renderQuestionReview(q, idx, results)).join('')}
          </div>
        </div>

        <div class="flex justify-center gap-4">
          <button onclick="navigateTo('quiz-setup')"
            class="px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold rounded-lg transition transform hover:scale-105">
            Try Another Quiz
          </button>
          <button onclick="navigateTo('dashboard')"
            class="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition">
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  `;
}

function statsCard(icon, label, value, color) {
  return `
    <div class="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
      <div class="text-4xl mb-2">${icon}</div>
      <div class="text-3xl font-bold text-${color}-400 mb-1">${value}</div>
      <div class="text-slate-400">${label}</div>
    </div>
  `;
}

function renderQuestionReview(question, index, results) {
  const userAnswer = quizState.answers[index];
  const isCorrect = userAnswer === question.correctAnswer;

  return `
    <div class="border border-slate-700 rounded-lg p-6 ${isCorrect ? 'bg-emerald-900 bg-opacity-20' : 'bg-red-900 bg-opacity-20'}">
      <div class="flex items-start justify-between mb-4">
        <h3 class="text-lg text-white font-semibold flex-1">
          ${index + 1}. ${question.question}
        </h3>
        <span class="text-2xl ml-4">${isCorrect ? '✅' : '❌'}</span>
      </div>

      <div class="space-y-2 mb-4">
        ${question.options.map((option, idx) => `
          <div class="px-4 py-2 rounded ${
            idx === question.correctAnswer
              ? 'bg-emerald-500 bg-opacity-30 border border-emerald-500'
              : idx === userAnswer && !isCorrect
                ? 'bg-red-500 bg-opacity-30 border border-red-500'
                : 'bg-slate-700'
          }">
            <span class="font-semibold mr-2">${String.fromCharCode(65 + idx)}.</span>
            <span class="text-slate-200">${option}</span>
            ${idx === question.correctAnswer ? ' ✓' : ''}
            ${idx === userAnswer && !isCorrect ? ' (Your answer)' : ''}
          </div>
        `).join('')}
      </div>

      <div class="bg-slate-700 rounded-lg p-4">
        <h4 class="font-semibold text-indigo-400 mb-2">Explanation:</h4>
        <p class="text-slate-300">${question.explanation}</p>
      </div>
    </div>
  `;
}

function renderDashboard() {
  if (!currentUser) {
    navigateTo('login');
    return '';
  }

  const history = getQuizHistory();
  const avgScore = calculateAverageScore();
  const totalQuizzes = history.length;
  const streak = calculateStreak();

  return `
    <div class="pt-16 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-8">Dashboard</h1>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          ${dashboardCard('📝', 'Total Quizzes', totalQuizzes, 'indigo')}
          ${dashboardCard('⭐', 'Average Score', avgScore + '%', 'emerald')}
          ${dashboardCard('🔥', 'Day Streak', streak, 'yellow')}
          ${dashboardCard('🎯', 'Best Score', getBestScore() + '%', 'blue')}
        </div>

        ${history.length > 0 ? `
          <div class="bg-slate-800 rounded-2xl p-8 border border-slate-700 mb-8">
            <h2 class="text-2xl font-bold text-white mb-6">Performance Overview</h2>
            <div class="space-y-4">
              ${renderSimpleBarChart(history.slice(-5))}
            </div>
          </div>

          <div class="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <h2 class="text-2xl font-bold text-white mb-6">Recent Quizzes</h2>
            <div class="space-y-4">
              ${history.slice(-10).reverse().map(quiz => renderQuizHistoryItem(quiz)).join('')}
            </div>
          </div>
        ` : `
          <div class="bg-slate-800 rounded-2xl p-12 border border-slate-700 text-center">
            <div class="text-6xl mb-4">📚</div>
            <h3 class="text-2xl font-bold text-white mb-4">No quizzes yet!</h3>
            <p class="text-slate-400 mb-6">Start your learning journey by taking your first quiz</p>
            <button onclick="navigateTo('quiz-setup')"
              class="px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold rounded-lg transition transform hover:scale-105">
              Start First Quiz
            </button>
          </div>
        `}
      </div>
    </div>
  `;
}

function dashboardCard(icon, label, value, color) {
  return `
    <div class="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div class="flex items-center justify-between mb-3">
        <span class="text-3xl">${icon}</span>
        <span class="text-${color}-400 text-sm font-semibold">●</span>
      </div>
      <div class="text-3xl font-bold text-white mb-1">${value}</div>
      <div class="text-slate-400 text-sm">${label}</div>
    </div>
  `;
}

function renderSimpleBarChart(quizzes) {
  const maxScore = 100;
  return quizzes.map((quiz, idx) => `
    <div class="flex items-center space-x-4">
      <span class="text-slate-400 text-sm w-24">${quiz.language}</span>
      <div class="flex-1 bg-slate-700 rounded-full h-8 relative overflow-hidden">
        <div class="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-end px-3 transition-all"
          style="width: ${quiz.percentage}%">
          <span class="text-white font-semibold text-sm">${quiz.percentage}%</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderQuizHistoryItem(quiz) {
  return `
    <div class="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition">
      <div>
        <h4 class="text-white font-semibold">${quiz.language} - ${quiz.topic}</h4>
        <p class="text-slate-400 text-sm">${new Date(quiz.date).toLocaleDateString()} • ${quiz.difficulty}</p>
      </div>
      <div class="flex items-center space-x-4">
        <div class="text-right">
          <div class="text-2xl font-bold ${quiz.percentage >= 80 ? 'text-emerald-400' : quiz.percentage >= 60 ? 'text-blue-400' : 'text-yellow-400'}">
            ${quiz.percentage}%
          </div>
          <div class="text-slate-400 text-sm">${quiz.correct}/${quiz.total}</div>
        </div>
      </div>
    </div>
  `;
}

function renderModals() {
  return `
    <div id="note-modal" class="hidden fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onclick="closeNoteModal(event)">
      <div class="bg-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-700" onclick="event.stopPropagation()">
        <div id="note-modal-content"></div>
      </div>
    </div>
  `;
}

function navigateTo(section) {
  currentSection = section;
  renderApp();
  window.scrollTo(0, 0);
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const users = JSON.parse(localStorage.getItem('ecm_users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    currentUser = { name: user.name, email: user.email };
    localStorage.setItem('ecm_current_user', JSON.stringify(currentUser));
    navigateTo('home');
  } else {
    alert('Invalid email or password!');
  }
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  const users = JSON.parse(localStorage.getItem('ecm_users') || '[]');

  if (users.find(u => u.email === email)) {
    alert('Email already exists!');
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem('ecm_users', JSON.stringify(users));

  currentUser = { name, email };
  localStorage.setItem('ecm_current_user', JSON.stringify(currentUser));
  navigateTo('home');
}

function logout() {
  currentUser = null;
  localStorage.removeItem('ecm_current_user');
  navigateTo('home');
}

function filterNotes() {
  const searchTerm = document.getElementById('search-notes')?.value.toLowerCase() || '';
  const filterLang = document.getElementById('filter-language')?.value || '';

  const cards = document.querySelectorAll('.note-card');
  cards.forEach(card => {
    const title = card.getAttribute('data-title');
    const language = card.getAttribute('data-language');
    const tags = card.getAttribute('data-tags');

    const matchesSearch = title.includes(searchTerm) || tags.includes(searchTerm);
    const matchesFilter = !filterLang || language === filterLang;

    card.style.display = matchesSearch && matchesFilter ? 'block' : 'none';
  });
}

function openNoteModal(noteId) {
  const note = getAllNotes().find(n => n.id === noteId);
  if (!note) return;

  const modalContent = `
    <div class="p-8">
      <div class="flex justify-between items-start mb-6">
        <div>
          <span class="px-3 py-1 bg-indigo-500 text-white rounded-full text-xs font-semibold">${note.language}</span>
          <h2 class="text-3xl font-bold text-white mt-4">${note.title}</h2>
        </div>
        <button onclick="closeNoteModal()" class="text-slate-400 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <p class="text-slate-300 mb-6">${note.summary}</p>

      <div class="bg-slate-900 rounded-lg p-4 mb-6 relative">
        <button onclick="copyCode(this)" class="absolute top-4 right-4 px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded text-sm transition">
          Copy
        </button>
        <pre><code class="language-${note.language.toLowerCase()}">${note.example}</code></pre>
      </div>

      <div class="flex flex-wrap gap-2">
        ${note.tags.map(tag => `<span class="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">${tag}</span>`).join('')}
      </div>
    </div>
  `;

  document.getElementById('note-modal-content').innerHTML = modalContent;
  document.getElementById('note-modal').classList.remove('hidden');

  setTimeout(() => {
    if (window.hljs) {
      document.querySelectorAll('pre code').forEach((block) => {
        window.hljs.highlightElement(block);
      });
    }
  }, 100);
}

function closeNoteModal(event) {
  if (!event || event.target.id === 'note-modal') {
    document.getElementById('note-modal').classList.add('hidden');
  }
}

function copyCode(button) {
  const code = button.parentElement.querySelector('code').textContent;
  navigator.clipboard.writeText(code);
  button.textContent = 'Copied!';
  setTimeout(() => {
    button.textContent = 'Copy';
  }, 2000);
}

function startQuiz() {
  const language = document.getElementById('quiz-language').value;
  const topic = document.getElementById('quiz-topic').value;
  const difficulty = document.getElementById('quiz-difficulty').value;
  const count = parseInt(document.getElementById('quiz-count').value);

  if (!language || !topic || !difficulty) {
    alert('Please fill in all fields!');
    return;
  }

  quizState = {
    questions: generateQuestions(language, topic, difficulty, count),
    currentIndex: 0,
    answers: {},
    markedForReview: [],
    startTime: Date.now(),
    selectedLanguage: language,
    selectedTopic: topic,
    selectedDifficulty: difficulty,
    totalQuestions: count
  };

  navigateTo('quiz-runner');
  startTimer();
}

function selectAnswer(optionIndex) {
  quizState.answers[quizState.currentIndex] = optionIndex;
  renderApp();
}

function previousQuestion() {
  if (quizState.currentIndex > 0) {
    quizState.currentIndex--;
    renderApp();
  }
}

function nextQuestion() {
  if (quizState.currentIndex < quizState.questions.length - 1) {
    quizState.currentIndex++;
    renderApp();
  }
}

function jumpToQuestion(index) {
  quizState.currentIndex = index;
  renderApp();
}

function toggleMarkForReview() {
  const index = quizState.currentIndex;
  if (quizState.markedForReview.includes(index)) {
    quizState.markedForReview = quizState.markedForReview.filter(i => i !== index);
  } else {
    quizState.markedForReview.push(index);
  }
  renderApp();
}

function submitQuiz() {
  const unanswered = quizState.questions.length - Object.keys(quizState.answers).length;
  if (unanswered > 0) {
    if (!confirm(`You have ${unanswered} unanswered questions. Submit anyway?`)) {
      return;
    }
  }

  const results = calculateResults();
  saveQuizHistory(results);
  navigateTo('quiz-results');
}

function calculateResults() {
  let correct = 0;
  let wrong = 0;

  quizState.questions.forEach((q, idx) => {
    if (quizState.answers[idx] === q.correctAnswer) {
      correct++;
    } else if (quizState.answers[idx] !== undefined) {
      wrong++;
    }
  });

  const total = quizState.questions.length;
  const percentage = Math.round((correct / total) * 100);
  const timeTaken = Date.now() - quizState.startTime;

  return { correct, wrong, total, percentage, timeTaken };
}

function saveQuizHistory(results) {
  const history = getQuizHistory();
  history.push({
    language: quizState.selectedLanguage,
    topic: quizState.selectedTopic,
    difficulty: quizState.selectedDifficulty,
    correct: results.correct,
    total: results.total,
    percentage: results.percentage,
    timeTaken: results.timeTaken,
    date: Date.now()
  });
  localStorage.setItem(`ecm_quiz_history_${currentUser.email}`, JSON.stringify(history));
}

function getQuizHistory() {
  if (!currentUser) return [];
  return JSON.parse(localStorage.getItem(`ecm_quiz_history_${currentUser.email}`) || '[]');
}

function calculateAverageScore() {
  const history = getQuizHistory();
  if (history.length === 0) return 0;
  const sum = history.reduce((acc, quiz) => acc + quiz.percentage, 0);
  return Math.round(sum / history.length);
}

function getBestScore() {
  const history = getQuizHistory();
  if (history.length === 0) return 0;
  return Math.max(...history.map(q => q.percentage));
}

function calculateStreak() {
  const history = getQuizHistory();
  if (history.length === 0) return 0;

  let streak = 0;
  const today = new Date().setHours(0, 0, 0, 0);
  const oneDayMs = 24 * 60 * 60 * 1000;

  for (let i = history.length - 1; i >= 0; i--) {
    const quizDate = new Date(history[i].date).setHours(0, 0, 0, 0);
    const daysDiff = Math.floor((today - quizDate) / oneDayMs);

    if (daysDiff === streak) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

let timerInterval;

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const elapsed = Date.now() - quizState.startTime;
    const timerEl = document.getElementById('timer');
    if (timerEl) {
      timerEl.textContent = formatTime(elapsed);
    }
  }, 1000);
}

function launchConfetti() {
  const colors = ['#6366F1', '#10B981', '#3B82F6', '#F59E0B', '#EF4444'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.opacity = '1';
    confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
    confetti.style.transition = 'all 3s ease-out';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '50%';

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.style.top = '100vh';
      confetti.style.opacity = '0';
      confetti.style.transform = 'rotate(' + (Math.random() * 720) + 'deg)';
    }, 50);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

function attachEventListeners() {
  window.navigateTo = navigateTo;
  window.handleLogin = handleLogin;
  window.handleSignup = handleSignup;
  window.logout = logout;
  window.filterNotes = filterNotes;
  window.openNoteModal = openNoteModal;
  window.closeNoteModal = closeNoteModal;
  window.copyCode = copyCode;
  window.startQuiz = startQuiz;
  window.selectAnswer = selectAnswer;
  window.previousQuestion = previousQuestion;
  window.nextQuestion = nextQuestion;
  window.jumpToQuestion = jumpToQuestion;
  window.toggleMarkForReview = toggleMarkForReview;
  window.submitQuiz = submitQuiz;
}

renderApp();
