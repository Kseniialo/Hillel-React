import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <nav>
      <ul className={styles.nav}>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)}>Home</NavLink></li>
        <li><NavLink to="/countries" className={({ isActive }) => (isActive ? styles.active : undefined)}>Countries</NavLink></li>
      </ul>
    </nav>
  </header>
);

export default Header;
