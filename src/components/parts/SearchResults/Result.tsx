import React, { FC } from 'react';
import moment from 'moment';
import { isMobile, isDesktop } from 'react-device-detect';
import { Link } from 'react-router-dom';
import styles from './searchResults.module.scss';
import { Show } from '../../../ts/showInterfaces';

interface Props {
  show: Show
}
const Result:FC<Props> = ({ show }) => {

  return (
    <Link
      to={`/show/${show.id}`}
      className={styles.showDetails}
    >
      <div className={styles.imageWrapper}>
        <img className={styles.showImage} src={`https://image.tmdb.org/t/p/original${show && show.poster_path}`} alt="show poster" />
      </div>
      <div className={styles.details}>
        <div className={styles.nameAndAirDate}>
          <h4>{show.name}</h4>
          <div className={styles.firstAired}>
            <p>First Aired</p>
            <p>{moment(show.first_air_date).format('YYYY')}</p>
          </div>
        </div>
        <p >
          {isDesktop ? show.overview : show.overview.slice(0, 70)}
          {isMobile && show.overview.length > 70 && '...'}
        </p>
      </div>
    </Link>
  );
};

export default Result;
