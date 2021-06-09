import React, { FC } from 'react';
import { GrFavorite } from 'react-icons/gr';
import styles from './showDetails.module.scss';
import { IShowDetails as Show } from '../../../context/ShowsContext';

interface IProps {
  show: Show | undefined;
}

const SaveOrFavorite:FC<IProps> = ({ show }) => {
  return (
    <div className={styles.saveOrFavorite}>
      <div className={styles.favorite}>
        <GrFavorite className={styles.heart} />
      </div>
      <div className={styles.watchlist}>
        <button className={styles.watchlistButton}>Add To List</button>
      </div>
    </div>
  );
};

export default SaveOrFavorite;
