import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { usePalette } from 'react-palette';
import styles from './showInfo.module.scss';
import { APIContext } from '../../../context/APIContext';
import { ShowDetails } from '../../../ts/showInterfaces';
import Header from './Header';
import ScoreAndTrailer from './ScoreAndTrailer';
import Classification from './Classification';
import Overview from './Overview';
import SaveOrFavorite from './Favorite';

type ShowParams = {
  id: string
}

type Rating = {
  iso_3166_1: string,
  rating: string
}

export const ShowInfo = () => {
  const { id } = useParams<ShowParams>();
  const { getShowDetails, getShowTrailer, getShowRating } = useContext(APIContext);
  const [show, setShow] = useState<ShowDetails>();
  const [trailer, setTrailer] = useState<string>('');
  const [rating, setRating] = useState<Rating>();

  const getShow = async () => {
    try {
      const details = await getShowDetails(id);
      setShow(details);
      const videos = await getShowTrailer(id);
      setTrailer(videos.results[0].key);
      const showRating = await getShowRating(id);
      setRating(showRating.find((r: Rating) => {
        return r.iso_3166_1 === 'US';
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getShow();
  }, []);

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
      style={{ backgroundColor: data.vibrant, color: getContrast(data.vibrant) }}
    >
      <Header show={show} />
      <ScoreAndTrailer
        show={show}
        trailer={trailer}
        buttonColor={getContrast(data.vibrant)}
      />
      <Classification show={show} rating={rating && rating.rating} />
      <Overview show={show} />
      <SaveOrFavorite show={show} />
    </div>
  );
};

export default ShowInfo;
