import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { usePalette } from 'react-palette';
import { BsPlayFill } from 'react-icons/bs';
import YoutubeModal from 'react-youtube-modal';
import styles from './showDetails.module.scss';
import { APIContext } from '../../../context/APIContext';
import { IShowDetails as Show } from '../../../context/ShowsContext';

type ShowParams = {
  id: string
}

export const ShowDetails = () => {
  const { id } = useParams<ShowParams>();
  const { getShowDetails } = useContext(APIContext);
  const [show, setShow] = useState<Show | undefined>();
  const [openVideoModal, setOpenVideoModal] = useState(false);

  const getShow = async () => {
    try {
      const details = await getShowDetails(id);
      setShow(details);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getShow();
  }, []);

  const { data, loading, error } = usePalette(`https://image.tmdb.org/t/p/original${show && show.poster_path}`);

  return (
    <div
      className={styles.showDetails}
      style={{ backgroundColor: data.vibrant }}
    >
      <div
        className={styles.backdrop}
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${show && show.backdrop_path})` }}
      >
        <img
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/original${show && show.poster_path}`}
          alt={`${show && show.name}`}
        />
      </div>
      <h2>
        {show && show.name}
        {' '}

        <span>
          (
          {show && show.first_air_date.slice(0, 4)}
          )
        </span>
      </h2>
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

        <YoutubeModal videoId="B6-WRTmjFAA">
          <button type="button">
            {' '}
            <BsPlayFill className={styles.playIcon} />
            {' '}
            Play Trailer
          </button>
        </YoutubeModal>
      </div>
    </div>
  );
};

export default ShowDetails;
