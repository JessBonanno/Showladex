import React, { FC } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import YoutubeModal from 'react-youtube-modal';
import { IShowDetails as Show } from '../../../context/ShowsContext';
import styles from './showDetails.module.scss';

interface IProps {
  show: Show | undefined;
  trailer: string;
  buttonColor: string;
}

export const ScoreAndTrailer:FC<IProps> = ({ show, trailer, buttonColor }) => {
  return (
    <div className={styles.scoreAndTrailer}>
      <div className={styles.score}>
        <div className={styles.rating}>
          <p>
            {show && show.vote_average}
          </p>
        </div>
        <p>User Score</p>
      </div>
      <div className={styles.divider}></div>

      <YoutubeModal videoId={trailer}>
        <button type="button" style={{ color: buttonColor }}>
          {' '}
          <BsPlayFill className={styles.playIcon} />
          {' '}
          Play Trailer
        </button>
      </YoutubeModal>
    </div>
  );
};

export default ScoreAndTrailer;
