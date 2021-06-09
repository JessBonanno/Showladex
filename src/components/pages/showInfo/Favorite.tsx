import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import { GrFavorite } from 'react-icons/gr';
import { MdFavorite } from 'react-icons/md';
import styles from './showInfo.module.scss';
import { ShowDetails, Show, FavResults } from '../../../ts/showInterfaces';
import { APIContext } from '../../../context/APIContext';
import { ShowsContext } from '../../../context/ShowsContext';

interface Props {
  show: ShowDetails | undefined;
  color: string;
}

const Favorite:FC<Props> = ({ show, color }) => {
  const { markFavorite, getFavorites } = useContext(APIContext);
  const {
    favorites, setFavorites, page, setPage,
  } = useContext(ShowsContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const getUsersFavorites = async () => {
    try {
      const favs:FavResults = await getFavorites();
      if (favorites && favorites.length > 0 && favs.results) {
        setFavorites([...favorites, ...favs.results]);
      } else {
        setFavorites([...favs.results]);
      }
      setPage(page + 1);
      if (favs.total_pages > page + 1) {
        getUsersFavorites();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkFavorites = () => {
    if (show && favorites) {
      return favorites.find((fav: Show) => fav.id === show.id);
    }
    return false;
  };

  useEffect(() => {
    getUsersFavorites();
  }, []);

  useEffect(() => {
    if (checkFavorites()) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites]);

  return (
    <div className={styles.Favorite}>
      <div>
        {isFavorite
          ? (
            <MdFavorite
              onClick={async () => {
                await markFavorite(show && show.id, false);
                setIsFavorite(false);
              }}
              className={styles.heart}
            />
          )
          : (
            <GrFavorite
              onClick={async () => {
                await markFavorite(show && show.id, true);
                setIsFavorite(true);
              }}
              className={styles.heart}
            />
          )}
      </div>
    </div>
  );
};

export default Favorite;
