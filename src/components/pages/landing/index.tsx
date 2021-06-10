import React from 'react';

import styles from './landing.module.scss';
import Trending from '../../parts/trending';
import Search from '../../parts/search';

const Landing = () => {
  return (
    <div className={styles.landing}>
      <Search />
      <Trending />
    </div>
  );
};

export default Landing;
