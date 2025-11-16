export function getAllNotes() {
  return [
    {
      id: 1,
      language: 'Python',
      title: 'Python Variables and Data Types',
      summary: 'Learn about Python variables, strings, integers, floats, and boolean types with practical examples.',
      example: `# Variables in Python
name = "Alice"
age = 25
height = 5.8
is_student = True

# Type checking
print(type(name))    # <class 'str'>
print(type(age))     # <class 'int'>
print(type(height))  # <class 'float'>
print(type(is_student)) # <class 'bool'>`,
      tags: ['basics', 'variables', 'data-types']
    },
    {
      id: 2,
      language: 'JavaScript',
      title: 'JavaScript Functions and Arrow Functions',
      summary: 'Understanding function declarations, expressions, and modern arrow function syntax.',
      example: `// Function Declaration
function greet(name) {
  return "Hello, " + name;
}

// Arrow Function
const greetArrow = (name) => \`Hello, \${name}\`;

// Arrow function with implicit return
const square = x => x * x;

console.log(greet("John"));
console.log(square(5));`,
      tags: ['functions', 'es6', 'arrow-functions']
    },
    {
      id: 3,
      language: 'Java',
      title: 'Java Object-Oriented Programming',
      summary: 'Classes, objects, inheritance, and encapsulation in Java.',
      example: `public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

Person p = new Person("Alice", 25);
p.display();`,
      tags: ['oop', 'classes', 'encapsulation']
    },
    {
      id: 4,
      language: 'C++',
      title: 'C++ Pointers and References',
      summary: 'Understanding pointers, references, and memory management in C++.',
      example: `#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int* ptr = &x;  // Pointer to x
    int& ref = x;   // Reference to x

    cout << "Value: " << x << endl;
    cout << "Pointer: " << *ptr << endl;
    cout << "Reference: " << ref << endl;

    *ptr = 20;  // Changes x through pointer
    cout << "New value: " << x << endl;

    return 0;
}`,
      tags: ['pointers', 'references', 'memory']
    },
    {
      id: 5,
      language: 'Python',
      title: 'Python Lists and List Comprehension',
      summary: 'Working with Python lists and using list comprehension for concise code.',
      example: `# Basic list operations
numbers = [1, 2, 3, 4, 5]
numbers.append(6)
numbers.extend([7, 8])

# List comprehension
squares = [x**2 for x in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

# Filtering with list comprehension
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]`,
      tags: ['lists', 'arrays', 'comprehension']
    },
    {
      id: 6,
      language: 'JavaScript',
      title: 'JavaScript Promises and Async/Await',
      summary: 'Handling asynchronous operations with Promises and async/await syntax.',
      example: `// Promise example
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data loaded");
    }, 1000);
  });
};

// Async/Await
async function loadData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

loadData();`,
      tags: ['async', 'promises', 'async-await']
    },
    {
      id: 7,
      language: 'HTML',
      title: 'HTML Semantic Elements',
      summary: 'Using semantic HTML5 elements for better structure and accessibility.',
      example: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Semantic HTML</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h1>Article Title</h1>
            <p>Content here...</p>
        </article>
    </main>

    <footer>
        <p>&copy; 2024 My Website</p>
    </footer>
</body>
</html>`,
      tags: ['semantic', 'html5', 'structure']
    },
    {
      id: 8,
      language: 'CSS',
      title: 'CSS Flexbox Layout',
      summary: 'Master flexbox for responsive layouts and alignment.',
      example: `.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.item {
    flex: 1;
    padding: 20px;
}

/* Responsive flexbox */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
}`,
      tags: ['flexbox', 'layout', 'responsive']
    },
    {
      id: 9,
      language: 'React',
      title: 'React Hooks - useState and useEffect',
      summary: 'Understanding and using React Hooks for state and side effects.',
      example: `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;

    return () => {
      // Cleanup
    };
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
      tags: ['hooks', 'state', 'effects']
    },
    {
      id: 10,
      language: 'Node.js',
      title: 'Node.js Express Server Setup',
      summary: 'Creating a basic Express server with routing.',
      example: `const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ received: data });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
      tags: ['express', 'server', 'api']
    },
    {
      id: 11,
      language: 'SQL',
      title: 'SQL JOIN Operations',
      summary: 'Understanding INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN.',
      example: `-- INNER JOIN
SELECT users.name, orders.order_date
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- LEFT JOIN
SELECT users.name, orders.order_date
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- Multiple joins
SELECT u.name, o.order_date, p.product_name
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN products p ON o.product_id = p.id;`,
      tags: ['joins', 'queries', 'database']
    },
    {
      id: 12,
      language: 'Python',
      title: 'Python Decorators',
      summary: 'Creating and using decorators to modify function behavior.',
      example: `def timer_decorator(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"Execution time: {end - start}s")
        return result
    return wrapper

@timer_decorator
def slow_function():
    import time
    time.sleep(1)
    return "Done"

slow_function()`,
      tags: ['decorators', 'advanced', 'functions']
    },
    {
      id: 13,
      language: 'TypeScript',
      title: 'TypeScript Interfaces and Types',
      summary: 'Defining custom types and interfaces in TypeScript.',
      example: `interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

type Status = 'active' | 'inactive' | 'pending';

interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

const admin: Admin = {
  ...user,
  role: 'admin',
  permissions: ['read', 'write']
};`,
      tags: ['interfaces', 'types', 'typescript']
    },
    {
      id: 14,
      language: 'C',
      title: 'C Arrays and Strings',
      summary: 'Working with arrays and character strings in C.',
      example: `#include <stdio.h>
#include <string.h>

int main() {
    // Array
    int numbers[5] = {1, 2, 3, 4, 5};

    // String (char array)
    char name[50] = "Hello";

    // String operations
    strcat(name, " World");
    printf("%s\\n", name);
    printf("Length: %lu\\n", strlen(name));

    // Array iteration
    for(int i = 0; i < 5; i++) {
        printf("%d ", numbers[i]);
    }

    return 0;
}`,
      tags: ['arrays', 'strings', 'basics']
    },
    {
      id: 15,
      language: 'Go',
      title: 'Go Goroutines and Channels',
      summary: 'Concurrent programming with goroutines and channels in Go.',
      example: `package main

import (
    "fmt"
    "time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("Worker %d processing job %d\\n", id, j)
        time.Sleep(time.Second)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    for a := 1; a <= 5; a++ {
        <-results
    }
}`,
      tags: ['concurrency', 'goroutines', 'channels']
    },
    {
      id: 16,
      language: 'Rust',
      title: 'Rust Ownership and Borrowing',
      summary: 'Understanding Rust\'s unique ownership system and borrowing rules.',
      example: `fn main() {
    let s1 = String::from("hello");

    // Move
    let s2 = s1;
    // s1 is no longer valid

    // Borrowing
    let s3 = String::from("world");
    let len = calculate_length(&s3);
    println!("Length of '{}' is {}", s3, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}

fn change(s: &mut String) {
    s.push_str(", world");
}`,
      tags: ['ownership', 'borrowing', 'memory-safety']
    },
    {
      id: 17,
      language: 'PHP',
      title: 'PHP Array Functions',
      summary: 'Common PHP array manipulation functions.',
      example: `<?php
$numbers = [1, 2, 3, 4, 5];

// Map
$squared = array_map(function($n) {
    return $n * $n;
}, $numbers);

// Filter
$evens = array_filter($numbers, function($n) {
    return $n % 2 == 0;
});

// Reduce
$sum = array_reduce($numbers, function($carry, $n) {
    return $carry + $n;
}, 0);

print_r($squared);
echo "Sum: $sum\\n";
?>`,
      tags: ['arrays', 'functions', 'map-filter-reduce']
    },
    {
      id: 18,
      language: 'Kotlin',
      title: 'Kotlin Data Classes and Extensions',
      summary: 'Using data classes and extension functions in Kotlin.',
      example: `data class User(
    val id: Int,
    val name: String,
    val email: String
)

fun String.isValidEmail(): Boolean {
    return this.contains("@") && this.contains(".")
}

fun main() {
    val user = User(1, "Alice", "alice@example.com")
    println(user)

    val email = "test@example.com"
    println(email.isValidEmail())

    // Data class features
    val user2 = user.copy(name = "Bob")
    println(user2)
}`,
      tags: ['data-classes', 'extensions', 'kotlin']
    },
    {
      id: 19,
      language: 'Swift',
      title: 'Swift Optionals and Guard',
      summary: 'Handling optional values safely in Swift.',
      example: `var name: String? = "Alice"

// Optional binding
if let unwrappedName = name {
    print("Hello, \\(unwrappedName)")
}

// Guard statement
func greet(person: String?) {
    guard let name = person else {
        print("No name provided")
        return
    }
    print("Hello, \\(name)")
}

// Nil coalescing
let displayName = name ?? "Guest"

// Optional chaining
struct Person {
    var residence: Residence?
}

struct Residence {
    var address: String?
}`,
      tags: ['optionals', 'safety', 'swift']
    },
    {
      id: 20,
      language: 'Dart',
      title: 'Dart Futures and Async Programming',
      summary: 'Asynchronous programming in Dart with Futures.',
      example: `Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 2));
  return 'Data loaded';
}

void main() async {
  print('Starting...');

  try {
    String data = await fetchData();
    print(data);
  } catch (e) {
    print('Error: $e');
  }

  // Multiple futures
  var results = await Future.wait([
    fetchData(),
    fetchData(),
  ]);

  print(results);
}`,
      tags: ['async', 'futures', 'dart']
    },
    {
      id: 21,
      language: 'C#',
      title: 'C# LINQ Queries',
      summary: 'Language Integrated Query (LINQ) for data manipulation.',
      example: `using System;
using System.Linq;
using System.Collections.Generic;

var numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Query syntax
var evenNumbers = from n in numbers
                  where n % 2 == 0
                  select n;

// Method syntax
var squares = numbers
    .Where(n => n > 5)
    .Select(n => n * n)
    .ToList();

// Aggregation
var sum = numbers.Sum();
var average = numbers.Average();

Console.WriteLine(string.Join(", ", evenNumbers));`,
      tags: ['linq', 'queries', 'csharp']
    },
    {
      id: 22,
      language: 'TailwindCSS',
      title: 'TailwindCSS Responsive Design',
      summary: 'Building responsive layouts with Tailwind utility classes.',
      example: `<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="bg-blue-500 p-4">Item 1</div>
  <div class="bg-blue-500 p-4">Item 2</div>
  <div class="bg-blue-500 p-4">Item 3</div>
  <div class="bg-blue-500 p-4">Item 4</div>
</div>

<!-- Responsive text -->
<h1 class="text-2xl md:text-4xl lg:text-6xl font-bold">
  Responsive Heading
</h1>

<!-- Hide/Show on breakpoints -->
<div class="hidden md:block">
  Desktop only
</div>`,
      tags: ['responsive', 'utilities', 'css']
    },
    {
      id: 23,
      language: 'React',
      title: 'React Context API',
      summary: 'Global state management using React Context.',
      example: `import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Current: {theme}
    </button>
  );
}`,
      tags: ['context', 'state-management', 'hooks']
    },
    {
      id: 24,
      language: 'MongoDB',
      title: 'MongoDB Queries and Aggregation',
      summary: 'Querying and aggregating data in MongoDB.',
      example: `// Find documents
db.users.find({ age: { $gte: 18 } })

// Update documents
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { status: "active" } }
)

// Aggregation pipeline
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: {
      _id: "$userId",
      total: { $sum: "$amount" }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 10 }
])`,
      tags: ['nosql', 'queries', 'aggregation']
    },
    {
      id: 25,
      language: 'PostgreSQL',
      title: 'PostgreSQL Window Functions',
      summary: 'Using window functions for advanced analytics.',
      example: `-- Row number
SELECT
  name,
  salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) as rank
FROM employees;

-- Running total
SELECT
  date,
  amount,
  SUM(amount) OVER (ORDER BY date) as running_total
FROM transactions;

-- Partition by
SELECT
  department,
  name,
  salary,
  AVG(salary) OVER (PARTITION BY department) as dept_avg
FROM employees;`,
      tags: ['window-functions', 'analytics', 'sql']
    },
    {
      id: 26,
      language: 'NextJS',
      title: 'Next.js Server-Side Rendering',
      summary: 'Implementing SSR and SSG in Next.js applications.',
      example: `// Server-Side Rendering
export async function getServerSideProps(context) {
  const res = await fetch(\`https://api.example.com/data\`);
  const data = await res.json();

  return {
    props: { data }
  };
}

// Static Site Generation
export async function getStaticProps() {
  const res = await fetch(\`https://api.example.com/posts\`);
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 60
  };
}

export default function Page({ data }) {
  return <div>{data.title}</div>;
}`,
      tags: ['ssr', 'ssg', 'nextjs']
    },
    {
      id: 27,
      language: 'Angular',
      title: 'Angular Services and Dependency Injection',
      summary: 'Creating and using services in Angular.',
      example: `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get('/api/data');
  }
}

// Using in component
@Component({
  selector: 'app-data',
  template: '<div>{{ data | json }}</div>'
})
export class DataComponent {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(
      data => this.data = data
    );
  }
}`,
      tags: ['services', 'dependency-injection', 'angular']
    },
    {
      id: 28,
      language: 'Vue',
      title: 'Vue Composition API',
      summary: 'Modern Vue 3 Composition API with reactive refs.',
      example: `<script setup>
import { ref, computed, onMounted } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}

onMounted(() => {
  console.log('Component mounted');
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>`,
      tags: ['composition-api', 'vue3', 'reactive']
    },
    {
      id: 29,
      language: 'Firebase',
      title: 'Firebase Firestore CRUD Operations',
      summary: 'Creating, reading, updating, and deleting Firestore documents.',
      example: `import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

// Create
await addDoc(collection(db, 'users'), {
  name: 'Alice',
  email: 'alice@example.com'
});

// Read
const snapshot = await getDocs(collection(db, 'users'));
snapshot.forEach(doc => {
  console.log(doc.id, doc.data());
});

// Update
await updateDoc(doc(db, 'users', userId), {
  name: 'Bob'
});

// Delete
await deleteDoc(doc(db, 'users', userId));`,
      tags: ['firestore', 'crud', 'firebase']
    },
    {
      id: 30,
      language: 'Ruby',
      title: 'Ruby Blocks, Procs, and Lambdas',
      summary: 'Understanding Ruby\'s closure mechanisms.',
      example: `# Blocks
[1, 2, 3].each { |n| puts n * 2 }

# Procs
double = Proc.new { |x| x * 2 }
puts double.call(5)  # 10

# Lambdas
square = ->(x) { x * x }
puts square.call(4)  # 16

# Method with block
def repeat(n)
  n.times { yield }
end

repeat(3) { puts "Hello" }

# Difference: lambdas check argument count
my_proc = Proc.new { |x, y| puts x }
my_proc.call(1)  # Works

my_lambda = ->(x, y) { puts x }
# my_lambda.call(1)  # Error!`,
      tags: ['blocks', 'procs', 'lambdas']
    }
  ];
}
