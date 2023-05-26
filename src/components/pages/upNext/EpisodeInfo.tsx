import React, { FC} from 'react';
import { Link } from 'react-router-dom';
import { Show } from '../../../ts/showInterfaces';
import styles from './upNext.module.scss';
import { usePalette } from 'react-palette';
import { getContrast } from 'src/utils/helpers';

interface Props {
  show: Show
}

const EpisodeInfo:FC<Props> = ({ show }) => {
  const { data, loading, error } = usePalette(`https://image.tmdb.org/t/p/w500${show && show.poster_path}`);

  return (
    <Link
      to={`/show/${show.id}`}
      className={styles.showDetails}
    >
      <div className={styles.imageWrapper} style={{ backgroundColor: data.darkMuted, color: getContrast(data.darkMuted) }}>
        <img className={styles.showImage} src={`https://image.tmdb.org/t/p/original${show && show.poster_path}`} alt="show preview" />
      </div>
      <div className={styles.details}>
        <div className={styles.nameAndNetwork}>
          <h4>{show.name}</h4>
          <p className={styles.network}>{show.networks && show.networks[0].name}</p>
        </div>
        <p className={styles.episodeNumber}>
          S
          {show?.next_episode_to_air?.season_number}
          {' '}
          | E
          {show?.next_episode_to_air?.episode_number}
        </p>
        <p className={styles.episodeName}>
          {show?.next_episode_to_air?.name !== '' ? show?.next_episode_to_air?.name : `Episode ${show.next_episode_to_air.episode_number}`}
        </p>
      </div>
    </Link>
  );
};

export default EpisodeInfo;
