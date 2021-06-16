import React, { FC } from 'react';
import styles from './showInfo.module.scss';
import { ShowDetails } from '../../../ts/showInterfaces';
import { MovieDetails } from '../../../ts/movieInterfaces/index';

interface Props {
  show: ShowDetails | undefined;
  movie: MovieDetails | undefined;
}

const Overview:FC<Props> = ({ show, movie }) => {
  return (
    <div className={styles.overview}>
      <p>Overview</p>
      <p>{show ? show.overview : movie && movie.overview}</p>
      {show && show.created_by.length > 0
      && (
        <>
          <p className={styles.creator}>{show && show.created_by[0].name}</p>
          <p>Creator</p>
        </>
      )}
    </div>
  );
};

export default Overview;
