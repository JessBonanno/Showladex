import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './showPoster.module.scss';
import { Show } from '../../../ts/showInterfaces';

interface Props {
  media: Show;
}

export const ShowCard:FC<Props> = ({ media }) => {
  // console.log(media.poster_path);

  return (
    <div className={styles.card}>
      {media.poster_path !== null
      && (
        <>
          <Link to={`/${media.id}`}>
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
