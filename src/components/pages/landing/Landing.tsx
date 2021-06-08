import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { APIContext } from '../../../context/APIContext';
import { ShowsContext } from '../../../context/ShowsContext';
import { UsersContext } from '../../../context/UsersContext';
import TextButton from '../../common/button/TextButton';
import styles from './landing.module.scss';

const Landing = () => {
  const [authorized, setAuthorized] = useState(false);
  const { getUserToken, APP_URL, getSession } = useContext(APIContext);

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

  return (
    <div className={styles.landing}>
      <div className={styles.authorize}>
        <TextButton
          buttonText={!authorized ? 'Authorize App' : 'Deauthorize App'}
          clicker={!authorized ? saveSession : deleteSession}
        />
      </div>
      <div className={styles.trending}>Trending</div>
    </div>
  );
};

export default Landing;
