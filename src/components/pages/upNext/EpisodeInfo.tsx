import React, { FC } from 'react';
import { usePalette } from 'react-palette';
import { ShowDetails } from '../../../ts/showInterfaces';
import styles from './upNext.module.scss';

interface Props {
  show: ShowDetails
}

const EpisodeInfo:FC<Props> = ({ show }) => {
  const { data, loading, error } = usePalette(`https://image.tmdb.org/t/p/original${show && show.poster_path}`);

  const getContrast = (hexcolor: string | undefined) => {
    if (!hexcolor) {
      return 'white';
    }
    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === '#') {
      hexcolor = hexcolor.slice(1);
    }

    // Convert to RGB value
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);

    // Get YIQ ratio
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    // Check contrast
    return (yiq >= 128) ? '#232323' : 'white';
  };

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
