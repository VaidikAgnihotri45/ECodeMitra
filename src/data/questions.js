export function generateQuestions(language, topic, difficulty, count) {
  const allQuestions = getQuestionBank();

  let filtered = allQuestions.filter(q =>
    q.language === language &&
    q.topic === topic &&
    q.difficulty === difficulty
  );

  if (filtered.length < count) {
    filtered = allQuestions.filter(q => q.language === language);
  }

  if (filtered.length < count) {
    filtered = allQuestions;
  }

  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getQuestionBank() {
  return [
    {
      language: 'Python',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'What is the correct way to create a variable in Python?',
      options: ['var x = 5', 'int x = 5', 'x = 5', 'let x = 5'],
      correctAnswer: 2,
      explanation: 'In Python, you simply assign a value to a variable name without declaring a type. Python is dynamically typed.'
    },
    {
      language: 'Python',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'Which function is used to print output in Python?',
      options: ['echo()', 'console.log()', 'print()', 'printf()'],
      correctAnswer: 2,
      explanation: 'The print() function is the standard way to output text in Python.'
    },
    {
      language: 'Python',
      topic: 'Data Structures',
      difficulty: 'Medium',
      question: 'What is the time complexity of accessing an element in a Python list by index?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      correctAnswer: 2,
      explanation: 'Accessing an element by index in a Python list is O(1) because lists are implemented as dynamic arrays.'
    },
    {
      language: 'Python',
      topic: 'OOP',
      difficulty: 'Medium',
      question: 'Which keyword is used to create a class in Python?',
      options: ['function', 'class', 'def', 'struct'],
      correctAnswer: 1,
      explanation: 'The "class" keyword is used to define a class in Python.'
    },
    {
      language: 'JavaScript',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'What keyword is used to declare a constant in JavaScript?',
      options: ['var', 'let', 'const', 'final'],
      correctAnswer: 2,
      explanation: 'The "const" keyword is used to declare constants in JavaScript that cannot be reassigned.'
    },
    {
      language: 'JavaScript',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'Which symbol is used for single-line comments in JavaScript?',
      options: ['#', '//', '/*', '--'],
      correctAnswer: 1,
      explanation: 'Double forward slashes (//) are used for single-line comments in JavaScript.'
    },
    {
      language: 'JavaScript',
      topic: 'Advanced',
      difficulty: 'Hard',
      question: 'What will "typeof null" return in JavaScript?',
      options: ['"null"', '"undefined"', '"object"', '"number"'],
      correctAnswer: 2,
      explanation: 'This is a known JavaScript quirk. "typeof null" returns "object", which is considered a bug in the language but cannot be fixed for backward compatibility.'
    },
    {
      language: 'JavaScript',
      topic: 'Data Structures',
      difficulty: 'Medium',
      question: 'Which method removes the last element from an array?',
      options: ['shift()', 'pop()', 'slice()', 'splice()'],
      correctAnswer: 1,
      explanation: 'The pop() method removes and returns the last element of an array.'
    },
    {
      language: 'Java',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'What is the entry point of a Java application?',
      options: ['start()', 'main()', 'run()', 'execute()'],
      correctAnswer: 1,
      explanation: 'The main() method is the entry point of any Java application. It must be public static void main(String[] args).'
    },
    {
      language: 'Java',
      topic: 'OOP',
      difficulty: 'Medium',
      question: 'Which keyword is used to inherit a class in Java?',
      options: ['implements', 'inherits', 'extends', 'derives'],
      correctAnswer: 2,
      explanation: 'The "extends" keyword is used for class inheritance in Java.'
    },
    {
      language: 'Java',
      topic: 'OOP',
      difficulty: 'Hard',
      question: 'Can a Java class extend multiple classes?',
      options: ['Yes, unlimited', 'Yes, up to 3', 'No, only one', 'Only if using interfaces'],
      correctAnswer: 2,
      explanation: 'Java does not support multiple inheritance for classes. A class can only extend one parent class, but can implement multiple interfaces.'
    },
    {
      language: 'C++',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'Which header file is required for input/output operations in C++?',
      options: ['<stdio.h>', '<iostream>', '<io.h>', '<input.h>'],
      correctAnswer: 1,
      explanation: '<iostream> is the standard header for input/output operations in C++, providing cin and cout.'
    },
    {
      language: 'C++',
      topic: 'Advanced',
      difficulty: 'Hard',
      question: 'What is the purpose of a virtual destructor in C++?',
      options: ['Faster execution', 'Proper cleanup in inheritance', 'Save memory', 'Enable polymorphism'],
      correctAnswer: 1,
      explanation: 'A virtual destructor ensures proper cleanup when deleting derived class objects through base class pointers, preventing memory leaks.'
    },
    {
      language: 'C++',
      topic: 'Data Structures',
      difficulty: 'Medium',
      question: 'Which STL container provides O(1) average time complexity for insertion and deletion?',
      options: ['vector', 'list', 'unordered_map', 'array'],
      correctAnswer: 2,
      explanation: 'unordered_map (hash table) provides O(1) average time complexity for insertion, deletion, and lookup operations.'
    },
    {
      language: 'HTML',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'Which tag is used to create a hyperlink in HTML?',
      options: ['<link>', '<a>', '<href>', '<url>'],
      correctAnswer: 1,
      explanation: 'The <a> (anchor) tag is used to create hyperlinks in HTML with the href attribute.'
    },
    {
      language: 'HTML',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks Text Markup Language'],
      correctAnswer: 0,
      explanation: 'HTML stands for Hyper Text Markup Language, the standard markup language for web pages.'
    },
    {
      language: 'CSS',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'Which property is used to change the text color in CSS?',
      options: ['text-color', 'font-color', 'color', 'text-style'],
      correctAnswer: 2,
      explanation: 'The "color" property is used to set the text color in CSS.'
    },
    {
      language: 'CSS',
      topic: 'Advanced',
      difficulty: 'Medium',
      question: 'What does "z-index" control in CSS?',
      options: ['Font size', 'Stacking order', 'Zoom level', 'Border width'],
      correctAnswer: 1,
      explanation: 'z-index controls the stacking order of positioned elements. Higher values appear on top.'
    },
    {
      language: 'React',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'What is JSX in React?',
      options: ['A JavaScript compiler', 'JavaScript XML syntax', 'A testing library', 'A state management tool'],
      correctAnswer: 1,
      explanation: 'JSX is a syntax extension that allows writing HTML-like code in JavaScript files.'
    },
    {
      language: 'React',
      topic: 'Advanced',
      difficulty: 'Hard',
      question: 'What is the purpose of useCallback hook?',
      options: ['Memoize values', 'Memoize functions', 'Handle side effects', 'Manage state'],
      correctAnswer: 1,
      explanation: 'useCallback memoizes functions to prevent unnecessary re-renders when passing callbacks to child components.'
    },
    {
      language: 'Node.js',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'What is Node.js?',
      options: ['A framework', 'A library', 'A runtime environment', 'A database'],
      correctAnswer: 2,
      explanation: 'Node.js is a JavaScript runtime environment built on Chrome\'s V8 engine for running JavaScript on the server.'
    },
    {
      language: 'Node.js',
      topic: 'Advanced',
      difficulty: 'Medium',
      question: 'Which module is used for file system operations in Node.js?',
      options: ['file', 'fs', 'path', 'system'],
      correctAnswer: 1,
      explanation: 'The "fs" (file system) module provides APIs for interacting with the file system in Node.js.'
    },
    {
      language: 'SQL',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'Which SQL statement is used to retrieve data from a database?',
      options: ['GET', 'FETCH', 'SELECT', 'RETRIEVE'],
      correctAnswer: 2,
      explanation: 'The SELECT statement is used to query and retrieve data from a database.'
    },
    {
      language: 'SQL',
      topic: 'Advanced',
      difficulty: 'Hard',
      question: 'What is the difference between UNION and UNION ALL?',
      options: ['No difference', 'UNION removes duplicates', 'UNION ALL is faster', 'Both B and C'],
      correctAnswer: 3,
      explanation: 'UNION removes duplicate rows while UNION ALL includes all rows. UNION ALL is faster because it doesn\'t need to check for duplicates.'
    },
    {
      language: 'Python',
      topic: 'Advanced',
      difficulty: 'Hard',
      question: 'What is a decorator in Python?',
      options: ['A design pattern', 'A function that modifies another function', 'A class attribute', 'A loop construct'],
      correctAnswer: 1,
      explanation: 'A decorator is a function that takes another function and extends its behavior without explicitly modifying it.'
    },
    {
      language: 'Python',
      topic: 'Data Structures',
      difficulty: 'Easy',
      question: 'Which data structure is used for LIFO (Last In First Out)?',
      options: ['Queue', 'Stack', 'List', 'Set'],
      correctAnswer: 1,
      explanation: 'A Stack follows the LIFO principle where the last element added is the first one to be removed.'
    },
    {
      language: 'JavaScript',
      topic: 'OOP',
      difficulty: 'Medium',
      question: 'What does "this" keyword refer to in JavaScript?',
      options: ['The current function', 'The current object', 'The global object', 'Depends on context'],
      correctAnswer: 3,
      explanation: 'The "this" keyword refers to different objects depending on the execution context - it can refer to the global object, the object that called the function, or be explicitly bound.'
    },
    {
      language: 'Java',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'Which of these is a valid Java primitive data type?',
      options: ['String', 'int', 'Integer', 'Array'],
      correctAnswer: 1,
      explanation: 'int is a primitive data type in Java. String and Integer are classes, and Array is a reference type.'
    },
    {
      language: 'C++',
      topic: 'OOP',
      difficulty: 'Medium',
      question: 'What is polymorphism in C++?',
      options: ['Many forms', 'Multiple inheritance', 'Function overloading', 'All of the above'],
      correctAnswer: 3,
      explanation: 'Polymorphism means "many forms" and includes compile-time (function overloading) and runtime (virtual functions) polymorphism.'
    },
    {
      language: 'C',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'What is the correct way to declare a pointer in C?',
      options: ['int ptr;', 'int *ptr;', 'ptr int;', 'pointer int ptr;'],
      correctAnswer: 1,
      explanation: 'In C, pointers are declared using the asterisk (*) symbol before the variable name.'
    },
    {
      language: 'React',
      topic: 'Basics',
      difficulty: 'Medium',
      question: 'What is the virtual DOM in React?',
      options: ['A real DOM', 'A lightweight copy of DOM', 'A testing tool', 'A browser API'],
      correctAnswer: 1,
      explanation: 'The virtual DOM is a lightweight JavaScript representation of the actual DOM, used for efficient updates.'
    },
    {
      language: 'Node.js',
      topic: 'Basics',
      difficulty: 'Medium',
      question: 'What is npm?',
      options: ['Node Package Manager', 'New Programming Method', 'Node Process Manager', 'Network Package Manager'],
      correctAnswer: 0,
      explanation: 'npm stands for Node Package Manager, used to install and manage JavaScript packages.'
    },
    {
      language: 'SQL',
      topic: 'Basics',
      difficulty: 'Medium',
      question: 'What does ACID stand for in database transactions?',
      options: ['Atomic, Consistent, Isolated, Durable', 'All, Complete, Independent, Done', 'Accurate, Clear, Integrated, Detailed', 'Active, Complete, Isolated, Dynamic'],
      correctAnswer: 0,
      explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability - key properties of database transactions.'
    },
    {
      language: 'TypeScript',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'What is TypeScript?',
      options: ['A JavaScript framework', 'A superset of JavaScript', 'A testing library', 'A build tool'],
      correctAnswer: 1,
      explanation: 'TypeScript is a superset of JavaScript that adds static typing and other features.'
    },
    {
      language: 'Python',
      topic: 'Algorithms',
      difficulty: 'Medium',
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
      correctAnswer: 1,
      explanation: 'Binary search has O(log n) time complexity as it divides the search space in half each iteration.'
    },
    {
      language: 'JavaScript',
      topic: 'Advanced',
      difficulty: 'Medium',
      question: 'What is a closure in JavaScript?',
      options: ['A loop', 'A function with access to outer scope', 'An object property', 'A conditional statement'],
      correctAnswer: 1,
      explanation: 'A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.'
    },
    {
      language: 'Java',
      topic: 'Advanced',
      difficulty: 'Medium',
      question: 'What is the purpose of the "final" keyword in Java?',
      options: ['Ends program', 'Prevents modification', 'Deletes variable', 'Creates constant'],
      correctAnswer: 1,
      explanation: 'The "final" keyword prevents modification: final variables can\'t be reassigned, final methods can\'t be overridden, and final classes can\'t be inherited.'
    },
    {
      language: 'C++',
      topic: 'Basics',
      difficulty: 'Easy',
      question: 'What is the default access specifier for class members in C++?',
      options: ['public', 'private', 'protected', 'internal'],
      correctAnswer: 1,
      explanation: 'In C++, class members are private by default, while struct members are public by default.'
    },
    {
      language: 'HTML',
      topic: 'Advanced',
      difficulty: 'Medium',
      question: 'What is the purpose of the <meta> tag?',
      options: ['Display text', 'Provide metadata', 'Create links', 'Add images'],
      correctAnswer: 1,
      explanation: 'The <meta> tag provides metadata about the HTML document, such as character encoding, viewport settings, and SEO information.'
    },
    {
      language: 'CSS',
      topic: 'Advanced',
      difficulty: 'Hard',
      question: 'What is CSS specificity?',
      options: ['Browser compatibility', 'Rule priority system', 'Animation timing', 'Color format'],
      correctAnswer: 1,
      explanation: 'CSS specificity determines which style rules are applied when multiple rules target the same element. It\'s calculated based on selector types.'
    },
    {
      language: 'React',
      topic: 'Advanced',
      difficulty: 'Medium',
      question: 'What is React.memo used for?',
      options: ['State management', 'Component memoization', 'API calls', 'Routing'],
      correctAnswer: 1,
      explanation: 'React.memo is a higher-order component that memoizes a component, preventing unnecessary re-renders when props haven\'t changed.'
    },
    {
      language: 'Node.js',
      topic: 'Advanced',
      difficulty: 'Hard',
      question: 'What is the event loop in Node.js?',
      options: ['A for loop', 'A mechanism for handling async operations', 'A function', 'A variable'],
      correctAnswer: 1,
      explanation: 'The event loop is Node.js\'s mechanism for handling asynchronous operations, allowing non-blocking I/O operations.'
    },
    {
      language: 'SQL',
      topic: 'Advanced',
      difficulty: 'Medium',
      question: 'What is a foreign key?',
      options: ['Primary identifier', 'Link to another table', 'Unique constraint', 'Index type'],
      correctAnswer: 1,
      explanation: 'A foreign key is a column that creates a link between two tables by referencing the primary key of another table.'
    },
    {
      language: 'Python',
      topic: 'OOP',
      difficulty: 'Hard',
      question: 'What is the difference between __str__ and __repr__?',
      options: ['No difference', '__str__ is for users, __repr__ for developers', '__repr__ is for users, __str__ for developers', 'They are aliases'],
      correctAnswer: 1,
      explanation: '__str__ returns a user-friendly string representation, while __repr__ returns a developer-friendly, unambiguous representation that ideally could recreate the object.'
    },
    {
      language: 'JavaScript',
      topic: 'Basics',
      difficulty: 'Medium',
      question: 'What is the difference between == and === in JavaScript?',
      options: ['No difference', '== checks type, === doesn\'t', '=== checks type, == doesn\'t', '=== is faster'],
      correctAnswer: 2,
      explanation: '=== (strict equality) checks both value and type, while == (loose equality) only checks value after type coercion.'
    },
    {
      language: 'Java',
      topic: 'Data Structures',
      difficulty: 'Medium',
      question: 'Which collection allows duplicate elements in Java?',
      options: ['Set', 'Map', 'List', 'None'],
      correctAnswer: 2,
      explanation: 'List implementations like ArrayList and LinkedList allow duplicate elements, while Set does not.'
    },
    {
      language: 'C++',
      topic: 'Advanced',
      difficulty: 'Hard',
      question: 'What is RAII in C++?',
      options: ['A design pattern', 'Resource Acquisition Is Initialization', 'A memory leak', 'An error handling technique'],
      correctAnswer: 1,
      explanation: 'RAII (Resource Acquisition Is Initialization) is a C++ programming technique where resource allocation is tied to object lifetime, ensuring proper cleanup.'
    },
    {
      language: 'C',
      topic: 'Advanced',
      difficulty: 'Medium',
      question: 'What does malloc() return if allocation fails?',
      options: ['0', 'NULL', '-1', 'Exception'],
      correctAnswer: 1,
      explanation: 'malloc() returns NULL when memory allocation fails. Always check the return value before using allocated memory.'
    }
  ];
}
