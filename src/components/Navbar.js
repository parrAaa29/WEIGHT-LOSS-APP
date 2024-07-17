// src/components/Navbar.js
import React from 'react';
import Link from 'next/link';
import styles from './css/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link href="/calendar">Calendario</Link></li>
        <li><Link href="/upload">Subir Peso</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
