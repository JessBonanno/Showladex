import React, { FC } from 'react';
import { usePalette } from 'react-palette';
import { ShowDetails } from '../../../ts/showInterfaces';
import styles from './upNext.module.scss';

interface Props {
  show: ShowDetails
}

const EpisodeInfo:FC<Props> = ({ show }) => {
  const { data, loading, error } = usePalette(`https://image.tmdb.org/t/p/original${show && show.poster_path}`);

  return (
    <div
      className={styles.showDetails}
    >
      <div className={styles.imageWrapper}>
        <img className={styles.showImage} src={`https://image.tmdb.org/t/p/original${show && show.poster_path}`} alt="show preview" />
      </div>
      <div className={styles.details}>
        <div className={styles.nameAndNetwork}>
          <h4>{show.name}</h4>
          <p className={styles.network}>{show.networks[0].name}</p>
        </div>
        <p className={styles.episodeNumber}>
          S
          {show.next_episode_to_air.season_number}
          {' '}
          | E
          {show.next_episode_to_air.episode_number}
        </p>
        <p className={styles.episodeName}>
          {show.next_episode_to_air.name !== '' ? show.next_episode_to_air.name : `Episode ${show.next_episode_to_air.episode_number}`}
        </p>
      </div>
    </div>
  );
};

export default EpisodeInfo;
