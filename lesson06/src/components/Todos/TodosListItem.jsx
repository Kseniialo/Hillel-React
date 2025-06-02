import { useTasks } from "../../contexts/tasksContext";
import styles from "./TodosListItem.module.css";

const TodosListItem = ({ task }) => {
  const { changeStatus, removeTask } = useTasks();

  return (
    <div className={styles.task}>
      <span className={styles.title}>{task.title}</span>
      <div className={styles.actions}>
        {task.status === 0 && (
          <button onClick={() => changeStatus(task, 1)}>In progress</button>
        )}
        {task.status === 1 && (
          <>
            <button onClick={() => changeStatus(task, 0)}>To do</button>
            <button onClick={() => changeStatus(task, 2)}>Done</button>
          </>
        )}
        {task.status === 2 && (
          <button onClick={() => removeTask(task.id)}>To archive</button>
        )}
      </div>
    </div>
  );
};

export default TodosListItem;
