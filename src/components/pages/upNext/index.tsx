import React, {
  FC, useContext, useState, useEffect,
} from 'react';
import styles from './upNext.module.scss';
import { APIContext } from '../../../context/APIContext';
import { FavResults } from '../../../ts/showInterfaces';
import { ShowsContext } from '../../../context/ShowsContext';
import { datesArray, thisWeek, WeekDay } from '../../../utils/helpers';
import DaysShows from './DaysShows';

const UpNext = () => {
  return (
    <div className={styles.upNext}>
      <h2>What's on This Week</h2>
      {thisWeek.map((day: WeekDay) => {
        return (
          <DaysShows key={day.day} date={day.date} day={day.day} />
        );
      })}
    </div>
  );
};

export default UpNext;
