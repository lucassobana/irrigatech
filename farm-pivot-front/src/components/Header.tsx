import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/IrrigaTech.svg';

const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Fazendas', path: '/farm' },
  { label: 'Histórico', path: '/history' },
  { label: 'Usuários', path: '/users' },
];

export function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`${styles.nav} ${menuOpen ? styles.show : ''}`}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.link} ${isActive ? styles.active : ''}`}
              onClick={handleLinkClick}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
