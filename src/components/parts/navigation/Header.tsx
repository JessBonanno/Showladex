import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import NavBar from './NavBar';

const Header:FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={styles.header}>
      <h3>
        <i className="fas fa-tv"></i>
        Showladex
      </h3>
      <NavBar />
    </div>
  );
};

export default Header;
