import React, { useState, useContext } from 'react';
import { RiMenu3Line } from 'react-icons/ri';
import { CgClose } from 'react-icons/cg';
import styles from './navBar.module.scss';
import { NavLinks } from './NavLinks';
import { NavigationContext } from '../../../context/NavigationContext';

export const MobileNavigation = () => {
  const { open, setOpen } = useContext(NavigationContext);

  const openIcon = (
    <RiMenu3Line
      className={styles.hamburger}
      size="35px"
      onClick={() => setOpen(!open)}
    />

  );

  const closeIcon = (
    <>
      <CgClose
        className={styles.hamburger}
        size="35px"
        onClick={() => setOpen(!open)}
      />
      <NavLinks isMobile />
    </>
  );

  return (
    <nav className={styles.mobileNavigation}>
      {!open ? openIcon : closeIcon}
    </nav>
  );
};

export default MobileNavigation;
