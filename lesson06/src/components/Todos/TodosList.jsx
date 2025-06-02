import TodosListItem from "./TodosListItem";
import styles from "./TodosList.module.css";

const TodosList = ({ label, tasks }) => {
  return (
    <fieldset className={styles.list}>
      <legend className={styles.legend}>{label}: {tasks.length}</legend>
      {tasks.map((task) => (
        <TodosListItem key={task.id} task={task} />
      ))}
    </fieldset>
  );
};

export default TodosList;
