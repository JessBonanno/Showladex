import React, { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { APIContext } from '../../../context/APIContext';
import { ShowsContext, IShow as Show } from '../../../context/ShowsContext';
import ShowCard from '../../common/poster/ShowPoster';
import styles from './trending.module.scss';

const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 25];

export const Trending = () => {
  const { trending, setTrending } = useContext(ShowsContext);
  const { getTrendingShows } = useContext(APIContext);
  /**
   * Infinite scroll state
   */
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getShows = async () => {
    const shows = await getTrendingShows(pageNumber);
    if (trending && trending.length > 0) {
      setTrending([...trending, ...shows.results]);
    } else {
      setTrending(shows.results);
    }
    setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    getShows();
  }, []);

  return (
    <div className={styles.trending}>
      <h2>What's Trending</h2>
      <div>
        <InfiniteScroll
          className={styles.cardContainer}
          dataLength={(trending && trending.length) || []}
          next={getShows}
          hasMore={hasMore}
          loader={dummyArray.map((number, idx) => {
            return (
              <div className={styles.skeleton}></div>
            );
          })}
        >
          {trending && trending.length > 0 && trending.map((result: Show) => {
            return (
              <ShowCard media={result} key={result.id} />
            );
          })}

        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Trending;
