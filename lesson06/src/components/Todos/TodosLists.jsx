import { useTasks } from "../../contexts/tasksContext";
import { STATUSES } from "../../constants/statuses";
import TodosList from "./TodosList";
import styles from "./TodosLists.module.css";

const TodosLists = () => {
  const { tasks } = useTasks();

  return (
    <div className={styles.lists}>
      {STATUSES.map((s) => (
        <TodosList
          key={s.code}
          label={s.label}
          tasks={tasks.filter((t) => t.status === s.code)}
          status={s.code}
        />
      ))}
    </div>
  );
};

export default TodosLists;
