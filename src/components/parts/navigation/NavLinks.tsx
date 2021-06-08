import React, {
  FC, useContext, Dispatch, SetStateAction,
} from 'react';
import { Link } from 'react-router-dom';
import { NavigationContext } from '../../../context/NavigationContext';
import styles from './navBar.module.scss';

interface IProps {
  isMobile: boolean;
}

export const NavLinks:FC<IProps> = ({ isMobile }) => {
  const { setOpen } = useContext(NavigationContext);
  return (
    <ul>
      <li>
        <Link
          to="/"
          className={styles.navLink}
          onClick={() => setOpen(false)}
        >
          Shows
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className={styles.navLink}
          onClick={() => setOpen(false)}
        >
          Movies
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className={styles.navLink}
          onClick={() => setOpen(false)}
        >
          Authorize
        </Link>
      </li>
    </ul>
  );
};
