import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { usePalette } from 'react-palette';
import styles from './showDetails.module.scss';
import { APIContext } from '../../../context/APIContext';
import { IShowDetails as Show } from '../../../context/ShowsContext';
import Header from './Header';
import ScoreAndTrailer from './ScoreAndTrailer';
import Classification from './Classification';
import Overview from './Overview';

type ShowParams = {
  id: string
}

export const ShowDetails = () => {
  const { id } = useParams<ShowParams>();
  const { getShowDetails, getShowTrailer, getShowRating } = useContext(APIContext);
  const [show, setShow] = useState<Show | undefined>();
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [trailer, setTrailer] = useState<string>('');
  const [rating, setRating] = useState<string>('');

  const getShow = async () => {
    try {
      const details = await getShowDetails(id);
      setShow(details);
      const videos = await getShowTrailer(id);
      setTrailer(videos.results[0].key);
      const showRating = await getShowRating(id);
      setRating(showRating[0].rating);
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
      <Header show={show} />
      <ScoreAndTrailer show={show} trailer={trailer} />
      <Classification show={show} rating={rating} />
      <Overview show={show} />
    </div>
  );
};

export default ShowDetails;
