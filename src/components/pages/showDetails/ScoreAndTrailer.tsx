import React, { FC, useState } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import YoutubeModal from 'react-youtube-modal';
import Overlay from 'react-overlay-component';
import YouTube from 'react-youtube';
import { IShowDetails as Show } from '../../../context/ShowsContext';
import styles from './showDetails.module.scss';

interface IProps {
  show: Show | undefined;
  trailer: string;
  buttonColor: string;
}

export const ScoreAndTrailer:FC<IProps> = ({ show, trailer, buttonColor }) => {
  const [expand, setExpand] = useState(false);

  const [isOpen, setOverlay] = useState(false);

  const closeOverlay = () => setOverlay(false);

  const configs = {
    focusOutline: false,
  };

  const options = {
    height: '100%',
    width: '100%',
  };

  const onReady = (event: {
    target: any;
  }) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <div className={styles.scoreAndTrailer}>
      <Overlay configs={configs} isOpen={isOpen} closeOverlay={closeOverlay} style={{ background: 'none' }}>
        <div className={styles.videoContainer}>
          <YouTube videoId={trailer} opts={options} onReady={(e) => onReady(e)} />
        </div>
      </Overlay>
      <div className={styles.score}>
        <div className={styles.rating}>
          <p>
            {show && show.vote_average}
          </p>
        </div>
        <p>User Score</p>
      </div>
      <div className={styles.divider}></div>

      {/* <YoutubeModal videoId={trailer}> */}
      <button onClick={() => setOverlay(true)} type="button" style={{ color: buttonColor }}>
        {' '}
        <BsPlayFill className={styles.playIcon} />
        {' '}
        Play Trailer
      </button>
      {/* </YoutubeModal> */}
    </div>
  );
};

export default ScoreAndTrailer;
