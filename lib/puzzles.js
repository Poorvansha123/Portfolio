export const jsPuzzle = {
  question: "What will be the output?",
  code: "console.log(typeof null);",
  options: [
    { id: "a", text: '"null"', correct: false },
    { id: "b", text: '"object"', correct: true },
    { id: "c", text: '"undefined"', correct: false },
  ],
  explanation:
    "typeof null returns 'object' — this is a famous JavaScript bug that has existed since the first version of JS!",
};

export const reactPuzzle = {
  question: "What is the output?",
  code: `const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1);
}, []);

console.log(count);`,
  options: [
    { id: "a", text: "0", correct: false },
    { id: "b", text: "1", correct: true },
    { id: "c", text: "infinite loop", correct: false },
  ],
  explanation:
    "The useEffect runs after render and updates count to 1. On the next render, console.log prints 1.",
};

export const skillMatchItems = [
  { id: "react", text: "React", category: "Frontend" },
  { id: "nextjs", text: "Next.js", category: "Frontend" },
  { id: "tailwind", text: "Tailwind", category: "Styling" },
  { id: "styled", text: "Styled Components", category: "Styling" },
  { id: "node", text: "Node.js", category: "Backend" },
  { id: "git", text: "Git", category: "Tools" },
];

export const skillCategories = ["Frontend", "Styling", "Backend", "Tools"];
