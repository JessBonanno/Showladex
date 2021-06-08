import React, { FC } from 'react';
import styles from './showDetails.module.scss';
import { IShowDetails as Show } from '../../../context/ShowsContext';

interface IProps {
  show: Show | undefined;
}

export const Header:FC<IProps> = ({ show }) => {
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
