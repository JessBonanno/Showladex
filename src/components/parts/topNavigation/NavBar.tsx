import styles from './navBar.module.scss';
import MobileNavigation from './MobileNavigation';
import Navigation from './Navigation';


const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <MobileNavigation />
      <Navigation />
    </div>
  );
};

export default NavBar;
