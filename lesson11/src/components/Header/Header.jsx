import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useStore";
import styles from "./Header.module.css";

export default function Header() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <nav>
        <Link to="/flights" className={styles.logo}>Пошук авіаквитків</Link>
      </nav>
      {isAuthenticated && (
        <button onClick={handleLogout} className={styles.logout}>
          Вийти
        </button>
      )}
    </header>
  );
}
