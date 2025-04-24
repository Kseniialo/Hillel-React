import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const animalGroups = [
  {
    id: 1,
    category: "Predators",
    animals: [
      { name: "Lion", color: "#E09C53" },
      { name: "Tiger", color: "#FF7F0E" },
      { name: "Wolf", color: "#708090" }
    ]
  },
  {
    id: 2,
    category: "Herbivores",
    animals: [
      { name: "Elephant", color: "#A9A9F5" },
      { name: "Giraffe", color: "#FFC107" },
      { name: "Zebra", color: "#4B0082" }
    ]
  },
  {
    id: 3,
    category: "Domestic",
    animals: [
      { name: "Dog", color: "#FFB6C1" },
      { name: "Cat", color: "#9370DB" },
      { name: "Cow", color: "#8BC34A" }
    ]
  }
];

createRoot(document.getElementById('root')).render(
    <App  title="Animal groups" data={animalGroups}/>
)
