import React, { FC } from 'react';
import styles from './showDetails.module.scss';
import { IShowDetails as Show } from '../../../context/ShowsContext';

interface IProps {
  show: Show | undefined;
}

const Overview:FC<IProps> = ({ show }) => {
  return (
    <div className={styles.overview}>
      <p>Overview</p>
      <p>{show && show.overview}</p>
      <p className={styles.creator}>{show && show.created_by[0].name}</p>
      <p>Creator</p>
    </div>
  );
};

export default Overview;
