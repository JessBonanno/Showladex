import React, { FC } from 'react';
import styles from './upNext.module.scss';
import { Show } from '../../../ts/showInterfaces';
import { thisWeek } from '../../../utils/helpers';

console.log(thisWeek);

interface Props {
  shows: Show[];
}

const DaysShows:FC<Props> = ({ shows }) => {
  return (
    <div className={styles.DaysShows}>

    </div>
  );
};

export default DaysShows;
