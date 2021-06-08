import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { usePalette } from 'react-palette';
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
    <div className={styles.showDetails} style={{ backgroundColor: data.vibrant }}>
      {show && show.name}
      {id}
    </div>
  );
};

export default ShowDetails;
