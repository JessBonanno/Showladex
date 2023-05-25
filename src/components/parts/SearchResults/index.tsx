import React, { useContext } from 'react';
import { ShowsContext } from '../../../context/ShowsContext';
import { Show } from '../../../ts/showInterfaces';
import Result from './Result';
import styles from './searchResults.module.scss';

const SearchResults = () => {
  const { searchResultsState } = useContext(ShowsContext);
  const [searchResults, setSearchResults] = searchResultsState;
  return (
    <div className={styles.searchResults}>
      {searchResults && searchResults.length > 0 && searchResults.map((show: Show) => {
        return (<Result show={show} />);
      })}
    </div>
  );
};

export default SearchResults;
