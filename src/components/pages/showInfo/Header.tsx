import React, { FC } from 'react';
import styles from './showInfo.module.scss';
import { ShowDetails } from '../../../ts/showInterfaces';

interface Props {
  show: ShowDetails | undefined;
}

export const Header:FC<Props> = ({ show }) => {
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
      <h2>
        {show && show.name}
        {' '}

        <span>
          (
          {show && show.first_air_date.slice(0, 4)}
          )
        </span>
      </h2>
    </>
  );
};

export default Header;
