import React, {
  FC, useContext, useState, useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { APIContext } from '../../../context/APIContext';
import { NavigationContext } from '../../../context/NavigationContext';
import { ShowsContext } from '../../../context/ShowsContext';
import { UsersContext } from '../../../context/UsersContext';
import styles from './navBar.module.scss';

interface Props {
  isMobile: boolean;
}

export const NavLinks:FC<Props> = ({ isMobile }) => {
  const { setOpen } = useContext(NavigationContext);
  const {
    getUserToken, getSession, endSession, getAccountDetails,
  } = useContext(APIContext);
  const {
    authorized, setAuthorized, accountDetails, setAccountDetails,
  } = useContext(UsersContext);
  const { setFavorites } = useContext(ShowsContext);

  const createSession = async () => {
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
      localStorage.setItem('accountId', userInfo.id);
    }
  };

  const saveSession = async () => {
    await getUserToken();
    await getUserInfo();
    localStorage.setItem('accountId', accountDetails.id);
  };

  const deleteSession = async () => {
    const token = localStorage.getItem('session');
    try {
      const success = await endSession(token);
      if (success) {
        setAuthorized(true);
      }
      localStorage.removeItem('session');
      localStorage.removeItem('accountId');

      setAuthorized(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    createSession();
    getUserInfo();
  }, []);
  return (
    <ul className="w3-animate-right">
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
                to="/favorites"
                className={styles.navLink}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Favorites
              </Link>
            </li>
            <li>
              <Link
                to="/up-next"
                className={styles.navLink}
                onClick={() => {
                  setOpen(false);
                  setFavorites(null);
                }}
              >
                What's On
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
