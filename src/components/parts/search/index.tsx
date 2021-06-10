import React, { FC, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from './search.module.scss';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
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
      <form action="">
        <input type="search" name="searchTerm" value={searchTerm} placeholder="Search Shows" />
        <BsSearch className={styles.icon} />
      </form>
    </div>
  );
};

export default Search;
