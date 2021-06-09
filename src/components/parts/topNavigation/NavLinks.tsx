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
  const { getUserToken, getSession, getAccountDetails } = useContext(APIContext);
  const {
    authorized, setAuthorized, accountDetails, setAccountDetails,
  } = useContext(UsersContext);

  const createSession = async () => {
    console.log('creating session');
    const token = localStorage.getItem('movieToken');
    const success = await getSession(token);
    if (success) {
      setAuthorized(true);
    }
  };

  const getUserInfo = async () => {
    const userInfo = await getAccountDetails();
    if (userInfo) {
      setAccountDetails(userInfo);
      setAuthorized(true);
    }
  };

  const saveSession = async () => {
    await getUserToken();
  };

  const deleteSession = () => {
    localStorage.removeItem('session');
    setAuthorized(false);
  };

  useEffect(() => {
    createSession();
    getUserInfo();
  }, []);

  return (
    <ul>
      <li>
        <Link
          to="/"
          className={styles.navLink}
          onClick={() => {
            setOpen(false);
          }}
        >
          Home
        </Link>
      </li>
      {authorized
        ? (
          <>
            <li>
              <Link
                to="/"
                className={styles.navLink}
                onClick={() => {
                  setOpen(false);
                }}
              >
                WatchList
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={styles.navLink}
                onClick={() => {
                  setOpen(false);
                  deleteSession();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        )
        : (
          <li>
            <Link
              to="/"
              className={styles.navLink}
              onClick={() => {
                setOpen(false);
                saveSession();
              }}
            >
              Login
            </Link>
          </li>
        )}
    </ul>
  );
};
