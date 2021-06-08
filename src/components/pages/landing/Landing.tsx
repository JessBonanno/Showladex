import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { APIContext } from '../../../context/APIContext';
import { ShowsContext } from '../../../context/ShowsContext';
import { UsersContext } from '../../../context/UsersContext';
import TextButton from '../../common/button/TextButton';
import styles from './landing.module.scss';
import Trending from '../../parts/categories/Trending';

const Landing = () => {
  return (
    <div className={styles.landing}>
      <Trending />
    </div>
  );
};

export default Landing;
