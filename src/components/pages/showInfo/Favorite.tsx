import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import { GrFavorite } from 'react-icons/gr';
import { MdFavorite } from 'react-icons/md';
import styles from './showInfo.module.scss';
import { ShowDetails, Show } from '../../../ts/showInterfaces';
import { APIContext } from '../../../context/APIContext';

interface Props {
  show: ShowDetails | undefined;
}

interface IFavResults {
  results: [Show];
  total_pages: number;
  total_results: number;
}

const Favorite:FC<Props> = ({ show }) => {
  const { markFavorite, getFavorites } = useContext(APIContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState<Show[]>();
  const [page, setPage] = useState(1);

  const getUsersFavorites = async () => {
    try {
      const favs:IFavResults = await getFavorites();
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
      return favorites.find((fav) => fav.id === show.id);
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