import React, {
  FC, useContext, useState, useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { APIContext } from '../../../context/APIContext';
import { NavigationContext } from '../../../context/NavigationContext';
import { UsersContext } from '../../../context/UsersContext';
import styles from './navBar.module.scss';

interface IProps {
  isMobile: boolean;
}

export const NavLinks:FC<IProps> = ({ isMobile }) => {
  const { setOpen } = useContext(NavigationContext);
  const { getUserToken, getSession } = useContext(APIContext);
  const { authorized, setAuthorized } = useContext(UsersContext);

  const saveSession = async () => {
    await getUserToken();
  };

  const deleteSession = () => {
    localStorage.removeItem('session');
    setAuthorized(false);
  };

  const createSession = async () => {
    const token = localStorage.getItem('movieToken');
    const success = await getSession(token);
    if (success) {
      setAuthorized(true);
    }
  };

  useEffect(() => {
    createSession();
  }, []);

  console.log(authorized);
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
        {authorized
          ? (
            <Link
              to="/"
              className={styles.navLink}
              onClick={() => {
                setOpen(false);
                deleteSession();
              }}
            >
              Deauthorize App
            </Link>
          )
          : (
            <Link
              to="/"
              className={styles.navLink}
              onClick={() => {
                setOpen(false);
                saveSession();
              }}
            >
              Authorize App
            </Link>
          )}
      </li>
    </ul>
  );
};
