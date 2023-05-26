import React from 'react';
import styles from './navBar.module.scss';
import MemoizedNavLinks  from './NavLinks';

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <MemoizedNavLinks isMobile={false} setOpen={null}/>
    </nav>
  );
};

export default Navigation;
