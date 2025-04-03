
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add Quicksand font
const head = document.head;
const link = document.createElement("link");
link.type = "text/css";
link.rel = "stylesheet";
link.href = "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap";
head.appendChild(link);

// Set CSS variable for the font-family
document.documentElement.style.setProperty('--font-quicksand', '"Quicksand", sans-serif');

createRoot(document.getElementById("root")!).render(<App />);
