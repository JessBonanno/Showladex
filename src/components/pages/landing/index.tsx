import React from 'react';

import styles from './landing.module.scss';
import Trending from '../../parts/trending';

const Landing = () => {
  return (
    <div className={styles.landing}>
      <Trending />
    </div>
  );
};

export default Landing;
