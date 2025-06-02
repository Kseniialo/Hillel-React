import { createContext, useContext, useEffect, useReducer } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

const TasksContext = createContext();

const initialState = { tasks: [] };

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const fetchTasks = async () => {
    const res = await getTasks();
    dispatch({ type: "SET_TASKS", payload: res.data });
  };

  const addTask = async (title, status) => {
    await createTask({ title, status });
    fetchTasks();
  };

  const changeStatus = async (task, status) => {
    await updateTask(task.id, { ...task, status });
    fetchTasks();
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TasksContext.Provider value={{ tasks: state.tasks, addTask, changeStatus, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);