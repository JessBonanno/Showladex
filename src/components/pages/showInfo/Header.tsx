import React, { FC } from 'react';
import styles from './showInfo.module.scss';
import { ShowDetails } from '../../../ts/showInterfaces';
import Favorite from './Favorite';

interface Props {
  show: ShowDetails | undefined;
  color: string;
}

export const Header:FC<Props> = ({ show, color }) => {
  return (
    <>
      <div
        className={styles.backdrop}
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${show && show.backdrop_path})` }}
      >
        <img
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/original${show && show.poster_path}`}
          alt={`${show && show.name}`}
        />
      </div>
      <div className={styles.titleAndFavorite}>
        <h2 style={{ color }}>
          {show && show.name}
          {' '}

          <span>
            (
            {show && show.first_air_date.slice(0, 4)}
            )
          </span>
        </h2>
        <Favorite show={show} color={color} />
      </div>
    </>
  );
};

export default Header;
