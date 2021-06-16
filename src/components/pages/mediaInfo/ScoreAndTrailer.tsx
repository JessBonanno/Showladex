import React, { FC, useState } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import ModalVideo from 'react-modal-video';
import { ShowDetails } from '../../../ts/showInterfaces';
import styles from './showInfo.module.scss';
import 'react-modal-video/scss/modal-video.scss';
import { MovieDetails } from '../../../ts/movieInterfaces';

interface Props {
  show: ShowDetails | undefined;
  movie: MovieDetails | undefined;
  trailer: string;
  buttonColor: string;
}

export const ScoreAndTrailer:FC<Props> = ({
  show, movie, trailer, buttonColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.scoreAndTrailer}>
      <div className={styles.score}>
        <div
          className={styles.rating}
        >
          <p>
            {show ? show.vote_average : movie && movie.vote_average}
          </p>
        </div>
        <p>User Score</p>
      </div>
      <div className={styles.divider}></div>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={trailer}
        onClose={() => setIsOpen(false)}
      />
      <button onClick={() => setIsOpen(true)} style={{ color: buttonColor }}>
        {' '}
        <BsPlayFill className={styles.playIcon} />
        {' '}
        Play Trailer
      </button>
    </div>
  );
};

export default ScoreAndTrailer;
