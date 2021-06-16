import React, {
  FC, useState, useContext, useEffect,
} from 'react';
import { BsSearch } from 'react-icons/bs';
import { usePalette } from 'react-palette';
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

  const { data, loading, error } = usePalette(`https://image.tmdb.org/t/p/original${backgroundImage}`);
  const getContrast = (hexcolor: string | undefined) => {
    if (!hexcolor) {
      return 'white';
    }
    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === '#') {
      hexcolor = hexcolor.slice(1);
    }

    // Convert to RGB value
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);

    // Get YIQ ratio
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    // Check contrast
    return (yiq >= 128) ? '#232323' : 'white';
  };

  useEffect(() => {
    getBgImage();
  }, []);

  return (
    <>
      <div className={styles.search} style={{ backgroundImage: backgroundImage && `url(https://image.tmdb.org/t/p/original${backgroundImage})`, backgroundColor: data.muted }}>
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
    </>
  );
};

export default Search;
