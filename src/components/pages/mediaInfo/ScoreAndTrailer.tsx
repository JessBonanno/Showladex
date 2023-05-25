import React, { FC, useState } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import ModalVideo from 'react-modal-video';
import { ShowDetails } from '../../../ts/showInterfaces';
import styles from './showInfo.module.scss';
import 'react-modal-video/scss/modal-video.scss';
import { MovieDetailsResponse } from 'src/ts/apiInterfaces';

interface Props {
  show: ShowDetails | undefined;
  movie: MovieDetailsResponse | undefined;
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
            {show ? Math.round(show.vote_average * 10) / 10 : movie && Math.round(movie.vote_average * 10) / 10}
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
