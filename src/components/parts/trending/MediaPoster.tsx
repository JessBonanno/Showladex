import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './trending.module.scss';
import { Show } from '../../../ts/showInterfaces';
import { Movie } from '../../../ts/movieInterfaces';
import { ShowsContext } from '../../../context/ShowsContext';

interface Props {
  show: Show | null;
  movie: Movie | null;
}

export const MediaPoster:FC<Props> = ({ show, movie }) => {
  const { setSearchResults } = useContext(ShowsContext);

  return (
    <div className={styles.card}>
      {((show && show.poster_path !== null) || (movie && movie.poster_path !== null))
      && (
        <>
          <Link
            to={show ? `/show/${show.id}` : `/movie/${movie && movie.id}`}
            onClick={() => setSearchResults(null)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${show ? show.poster_path : movie && movie.poster_path}`}
              alt={`${show ? show.name : movie && movie.title}`}
            />
          </Link>
        </>

      )}
    </div>
  );
};

export default MediaPoster;
