import React, { useContext, useEffect } from 'react';
import { APIContext } from '../../../context/APIContext';
import { ShowsContext, IShow as Show } from '../../../context/ShowsContext';
import ShowCard from '../../common/mediaCards/ShowCard';
import styles from './trending.module.scss';

export const Trending = () => {
  const { trending, setTrending } = useContext(ShowsContext);
  const { getTrendingShows } = useContext(APIContext);

  const getShows = async () => {
    const shows = await getTrendingShows();
    setTrending(shows);
  };

  useEffect(() => {
    getShows();
  }, []);

  return (
    <div className={styles.trending}>
      <h2>What's Trending</h2>
      <div className={styles.cardContainer}>
        {trending && trending.results.length > 0 && trending.results.map((result: Show) => {
          return (
            <ShowCard media={result} key={result.id} />
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
