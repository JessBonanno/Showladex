import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './trending.module.scss';
import { Show } from '../../../ts/showInterfaces';
import { ShowsContext } from '../../../context/ShowsContext';

interface Props {
  media: Show;
}

export const ShowCard:FC<Props> = ({ media }) => {
  const { setSearchResults } = useContext(ShowsContext);

  return (
    <div className={styles.card}>
      {media.poster_path !== null
      && (
        <>
          <Link
            to={`/show/${media.id}`}
            onClick={() => setSearchResults(null)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${media.poster_path}`}
              alt={`${media.name}`}
            />
          </Link>
        </>
      )}

    </div>
  );
};

export default ShowCard;
