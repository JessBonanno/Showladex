import React, { FC, useState, useContext } from 'react';
import { BsSearch } from 'react-icons/bs';
import { APIContext } from '../../../context/APIContext';
import { ShowsContext } from '../../../context/ShowsContext';
import styles from './search.module.scss';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchShows } = useContext(APIContext);
  const { setSearchResults } = useContext(ShowsContext);

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (searchTerm) {
        const shows = await searchShows(searchTerm);
        if (shows.results.length) {
          setSearchResults(shows.results);
        }
      } else {
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.search} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618193319734-478296be37ad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=377&q=80)' }}>
      <h1>
        <b>Explore</b>
        {' '}
        tons of shows,
        {' '}
        <b>add</b>
        {' '}
        favorites,
        {' '}
        <b>track</b>
        {' '}
        when to watch!
      </h1>
      <form action="" onSubmit={handleSearch}>
        <input type="text" name="searchTerm" value={searchTerm} placeholder="Search Shows" onChange={(e) => setSearchTerm(e.target.value)} />
        <BsSearch onClick={handleSearch} className={styles.icon} />
      </form>
    </div>
  );
};

export default Search;
