import styles from './navBar.module.scss';
import MobileNavigation from './MobileNavigation';
import Navigation from './Navigation';
import { UserDetails } from 'src/ts/userInterfaces';

interface Props {
	accountDetails: UserDetails | null;
	setAccountDetails: React.Dispatch<React.SetStateAction<UserDetails | null>>;
	authorized: UserDetails | null;
	setAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ accountDetails, setAccountDetails, authorized, setAuthorized }) => {
  return (
    <div className={styles.navBar}>
      <MobileNavigation accountDetails={accountDetails} setAccountDetails={setAccountDetails} authorized={authorized} setAuthorized={setAuthorized}/>
      <Navigation accountDetails={accountDetails} setAccountDetails={setAccountDetails} authorized={authorized} setAuthorized={setAuthorized}/>
    </div>
  );
};

export default NavBar;
