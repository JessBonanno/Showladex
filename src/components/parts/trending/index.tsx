import React, { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import { APIContext } from '../../../context/APIContext';
import { MoviesContext } from '../../../context/MoviesContext';
import { ShowsContext } from '../../../context/ShowsContext';
import { Movie } from '../../../ts/movieInterfaces';
import { Show } from '../../../ts/showInterfaces';
import MediaPoster from '../../common/MediaPoster';
import styles from './trending.module.scss';

const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 25];

export const Trending = () => {
  const { trending, setTrending } = useContext(ShowsContext);
  const { trendingMovies, setTrendingMovies } = useContext(MoviesContext);
  const { getTrendingShows, getTrendingMovies } = useContext(APIContext);
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

  const getMovies = async () => {
    const movies = await getTrendingMovies(pageNumber);
    if (trendingMovies && trendingMovies.length > 0) {
      setTrendingMovies([...trendingMovies, ...movies.results]);
    } else {
      setTrendingMovies(movies.results);
    }
    setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    getShows();
    getMovies();
  }, []);

  return (
    <div className={styles.trending}>
      <div className={styles.heading}>
        <h2>Trending in TV</h2>
      </div>
      <div>
        <InfiniteScroll
          height="260px"
          className={styles.cardContainer}
          dataLength={(trending && trending.length) || []}
          next={getShows}
          hasMore={hasMore}
          loader={dummyArray.map((number) => {
            return (
              <div key={uuidv4()} className={styles.skeleton}></div>
            );
          })}
        >
          {trending && trending.length > 0 && trending
            .map((result: Show) => {
              return (
                <MediaPoster show={result} movie={null} key={uuidv4()} setShows={undefined} />
              );
            }) }

        </InfiniteScroll>
      </div>
      <div className={styles.heading}>
        <h2>Trending in Movies</h2>
      </div>
      <div>
        <InfiniteScroll
          height="260px"
          className={styles.cardContainer}
          dataLength={(trendingMovies && trendingMovies.length) || []}
          next={getMovies}
          hasMore={hasMore}
          loader={dummyArray.map((number) => {
            return (
              <div key={uuidv4()} className={styles.skeleton}></div>
            );
          })}
        >
          {trendingMovies && trendingMovies.length > 0 && trendingMovies
            .map((result: Movie) => {
              return (
                <MediaPoster show={null} movie={result} key={uuidv4()} setShows={undefined} />
              );
            }) }

        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Trending;
