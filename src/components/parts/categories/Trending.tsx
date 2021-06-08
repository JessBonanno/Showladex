import React, { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { APIContext } from '../../../context/APIContext';
import { ShowsContext, IShow as Show } from '../../../context/ShowsContext';
import ShowCard from '../../common/mediaCards/ShowCard';
import styles from './trending.module.scss';

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
          loader={<h4>Loading...</h4>}
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
