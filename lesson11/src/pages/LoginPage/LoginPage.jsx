import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/validationSchemas";
import { useAuthStore } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = ({ username, password }) => {
    if (login(username, password)) {
      navigate("/flights");
    } else {
      alert("Невірний логін або пароль!");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Вхід</h2>
        <label>
          Логін
          <input {...register("username")} placeholder="test" />
          {errors.username && <span>{errors.username.message}</span>}
        </label>
        <label>
          Пароль
          <input type="password" {...register("password")} placeholder="password" />
          {errors.password && <span>{errors.password.message}</span>}
        </label>
        <button type="submit">Увійти</button>
        <div className={styles.hint}>Тестовий логін: test / password</div>
      </form>
    </div>
  );
}
