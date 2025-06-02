import { useState } from "react";
import { useTasks } from "../../contexts/tasksContext";
import { STATUSES } from "../../constants/statuses";
import styles from "./TodosForm.module.css";

const TodosForm = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(0);
  const { addTask } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask(title, status);
    setTitle("");
    setStatus(0);
  };

  return (
    <fieldset className={styles.formWrapper}>
      <legend className={styles.legend}>Create task</legend>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <label className={styles.label}>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
          className={styles.select}
        >
          {STATUSES.map((s) => (
            <option key={s.code} value={s.code}>
              {s.label}
            </option>
          ))}
        </select>
        <button type="submit" className={styles.button}>
          Create task
        </button>
      </form>
    </fieldset>
  );
};

export default TodosForm;
