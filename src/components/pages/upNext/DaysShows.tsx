import React, {
  FC, useState, useEffect, useContext,
} from 'react';
import { usePalette } from 'react-palette';
import styles from './upNext.module.scss';
import { FavResults, ShowDetails } from '../../../ts/showInterfaces';
import EpisodeInfo from './EpisodeInfo';
import { ShowsContext } from '../../../context/ShowsContext';
import { datesArray } from '../../../utils/helpers';
import { APIContext } from '../../../context/APIContext';

interface Props {
  date: string;
  day: string;
}

const DaysShows:FC<Props> = ({ date, day }) => {
  const [todaysShows, setTodaysShows] = useState<ShowDetails[]>();
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

  useEffect(() => {
    if (favorites && favorites.length) {
      const list: ShowDetails[] = favorites && favorites.filter((show:ShowDetails) => {
        return show.next_episode_to_air.air_date === date;
      });
      setTodaysShows(list);
    }
  }, [favorites]);

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
