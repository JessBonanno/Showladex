import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { APIContext } from '../../../context/APIContext';
import { ShowsContext } from '../../../context/ShowsContext';
import { UsersContext } from '../../../context/UsersContext';
import TextButton from '../../common/button/TextButton';
import styles from './landing.module.scss';

const Landing = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.trending}>Trending</div>
    </div>
  );
};

export default Landing;
