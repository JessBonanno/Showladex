import React, { useContext } from 'react';
import { ShowsContext } from '../../../context/ShowsContext';
import { Show } from '../../../ts/showInterfaces';
import Result from './Result';
import styles from './searchResults.module.scss';

const SearchResults = () => {
  const { searchResults } = useContext(ShowsContext);
  return (
    <div className={styles.searchResults}>
      {searchResults.length > 0 && searchResults.map((show: Show) => {
        return (<Result show={show} />);
      })}
    </div>
  );
};

export default SearchResults;
