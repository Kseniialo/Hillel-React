import TodosForm from "./components/Todos/TodosForm";
import TodosLists from "./components/Todos/TodosLists";
import { TasksProvider } from "./contexts/tasksContext";
import "./index.css";

const App = () => (
  <TasksProvider>
    <div className="container">
      <TodosForm />
      <TodosLists />
    </div>
  </TasksProvider>
);

export default App;