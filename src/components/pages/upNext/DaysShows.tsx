import React, {
  FC, useState, useEffect, useContext,
} from 'react';
import styles from './upNext.module.scss';
import { FavResults, Show } from '../../../ts/showInterfaces';
import EpisodeInfo from './EpisodeInfo';
import { ShowsContext, ShowsProvider } from '../../../context/ShowsContext';
import { getFavorites } from 'src/utils/API';

interface Props {
  date: string;
  day: string;
}

const DaysShows:FC<Props> = ({ date, day }) => {
  const [todaysShows, setTodaysShows] = useState<Show[]>();
  const {
    favoritesState, showPageState,
  } = useContext(ShowsContext);
  const [favorites, setFavorites] = favoritesState;
  const [showPage, setShowPage] = showPageState;

  const getUsersFavorites = async () => {
    try {
      const favs:FavResults = await getFavorites();
      // eslint-disable-next-line consistent-return
      const airing = await Promise.all(favs.results.map(async (fav) => {
        // const details = await getShowDetails(fav.id.toString());
        // if (
        //   details.next_episode_to_air !== null
        //   && datesArray.includes(details.next_episode_to_air.air_date)
        // ) {
        //   return details;
        // }
      }));
      const cleanList = airing.filter((fav) => fav !== undefined);
      if (favorites && favorites.length > 0 && cleanList) {
        // setFavorites([...favorites, ...cleanList.filter((fav) => !favorites.includes(fav))]);
      } else {
        // setFavorites([...cleanList]);
      }
      setShowPage((showPage || 0) + 1);
      if (favs.total_pages > (showPage || 0) + 1) {
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
      const list = favorites && favorites.filter((show) => {
        return show?.next_episode_to_air?.air_date === date;
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

const MemoizedDaysShows = React.memo(DaysShows);

export default ({date, day}) => (
  <ShowsProvider>
    <MemoizedDaysShows date={date} day={day}/>
  </ShowsProvider>
);
