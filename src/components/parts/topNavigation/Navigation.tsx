import React from 'react';
import styles from './navBar.module.scss';
import { NavLinks } from './NavLinks';

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <NavLinks isMobile={false} />
    </nav>
  );
};

export default Navigation;
