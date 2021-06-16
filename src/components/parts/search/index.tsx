import React, {
  FC, useState, useContext, useEffect,
} from 'react';
import { BsSearch } from 'react-icons/bs';
import { APIContext } from '../../../context/APIContext';
import { ShowsContext } from '../../../context/ShowsContext';
import styles from './search.module.scss';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchShows, getRandomPopularImg } = useContext(APIContext);
  const { setSearchResults } = useContext(ShowsContext);
  const [backgroundImage, setBackgroundImage] = useState('');

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
    setSearchTerm('');
  };

  const getBgImage = async () => {
    const img = await getRandomPopularImg();
    setBackgroundImage(img);
  };

  useEffect(() => {
    getBgImage();
  }, []);

  return (
    <div className={styles.search} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${backgroundImage})` }}>
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
