import React, {
  FC, useContext, useState, useEffect,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { APIContext } from '../../../../context/APIContext';
import { Show } from '../../../../ts/showInterfaces';
import styles from './similarShows.module.scss';
import { MediaPoster } from '../../../common/MediaPoster';

interface Props {
  show: Show | undefined;
}

const SimilarShows:FC<Props> = ({ show }) => {
  const { getSimilarShows } = useContext(APIContext);
  const [shows, setShows] = useState<Show[]>([]);

  const getShows = async () => {
    try {
      const details = await getSimilarShows(show && show.id);
      setShows(details);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getShows();
    window.scrollTo(0, 0);
  }, [show]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {shows && shows.length > 0
      && (
        <div className={styles.similarShows}>
          <div className={styles.heading}>
            <p>More Like This</p>
          </div>
          <div>
            <div className={styles.cardContainer}>
              {shows && shows.length > 0 && shows.map((result: Show) => {
                return (
                  <MediaPoster show={result} movie={null} key={uuidv4()} setShows={setShows} />
                );
              }) }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimilarShows;
