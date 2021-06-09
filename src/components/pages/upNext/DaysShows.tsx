import React, { FC, useState, useEffect } from 'react';
import { usePalette } from 'react-palette';
import styles from './upNext.module.scss';
import { ShowDetails } from '../../../ts/showInterfaces';
import EpisodeInfo from './EpisodeInfo';

interface Props {
  shows: ShowDetails[];
  date: string;
  day: string;
}

const DaysShows:FC<Props> = ({ shows, date, day }) => {
  const [todaysShows, setTodaysShows] = useState<ShowDetails[]>();

  useEffect(() => {
    if (shows && shows.length) {
      const list: ShowDetails[] = shows && shows.filter((show:ShowDetails) => {
        return show.next_episode_to_air.air_date === date;
      });
      setTodaysShows(list);
    }
  }, [shows]);

  return (
    <div className={styles.daysShows}>
      <h3>{day}</h3>
      {todaysShows && todaysShows.length > 0 ? todaysShows.map((show) => {
        return (
          <EpisodeInfo show={show} key={show.id} />
        );
      })
        : (
          <div className={styles.noInfo}>
            <p>Nothing on today</p>
          </div>
        )}
    </div>
  );
};

export default DaysShows;
