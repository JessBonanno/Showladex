import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './showInfo.module.scss';
import { ShowDetails } from '../../../ts/showInterfaces';

interface Props {
  show: ShowDetails| undefined;
  rating: string | undefined;
}

export const Classification:FC<Props> = ({ rating, show }) => {
  return (
    <div className={styles.classification}>
      <div className={styles.ratingAndLength}>
        {rating
        && (
          <>
            <div className={styles.USrating}>
              <p>{rating}</p>
            </div>
            <div className={styles.dotDivider}>
              •
            </div>
          </>
        )}
        <div>
          <p>
            {show && show.episode_run_time}
            m
          </p>
        </div>
      </div>
      <div className={styles.genres}>
        {show && show.genres.map((genre, idx) => {
          if (idx !== show.genres.length - 1) {
            return (
              <p key={uuidv4()}>
                {genre.name}
                ,
              </p>
            );
          }
          return <p key={uuidv4()}>{genre.name}</p>;
        })}
      </div>
    </div>
  );
};

export default Classification;
