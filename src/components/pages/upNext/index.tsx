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
  const { getFavorites, getShowDetails } = useContext(APIContext);
  const {
    favorites, setFavorites, page, setPage,
  } = useContext(ShowsContext);

  const getUsersFavorites = async () => {
    try {
      const favs:FavResults = await getFavorites();
      // eslint-disable-next-line consistent-return
      const airing = await Promise.all(favs.results.map(async (fav) => {
        const details = await getShowDetails(fav.id);
        if (
          details.next_episode_to_air !== null
          && datesArray.includes(details.next_episode_to_air.air_date)
        ) {
          return details;
        }
      }));
      const cleanList = airing.filter((fav) => fav !== undefined);
      if (favorites && favorites.length > 0 && cleanList) {
        setFavorites([...favorites, ...cleanList.filter((fav) => !favorites.includes(fav))]);
      } else {
        setFavorites([...cleanList]);
      }
      setPage(page + 1);
      if (favs.total_pages > page + 1) {
        getUsersFavorites();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUsersFavorites();
  }, []);

  return (
    <div className={styles.upNext}>
      <h2>See What's on This Week</h2>
      {thisWeek.map((day: WeekDay) => {
        return (
          <DaysShows key={day.day} shows={favorites} date={day.date} day={day.day} />
        );
      })}
    </div>
  );
};

export default UpNext;
