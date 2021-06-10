import React, { useContext } from 'react';
import styles from './landing.module.scss';
import Trending from '../../parts/trending';
import Search from '../../parts/search';
import SearchResults from '../../parts/SearchResults';
import { ShowsContext } from '../../../context/ShowsContext';

const Landing = () => {
  const { searchResults } = useContext(ShowsContext);
  return (
    <div className={styles.landing}>
      <Search />
      {searchResults && searchResults.length > 0 && <SearchResults />}
      <Trending />
    </div>
  );
};

export default Landing;
