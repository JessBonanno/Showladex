import React, {
  FC, Context, createContext, useState,
} from 'react';
import { ShowsResults, ShowDetails } from '../ts/showInterfaces';

export const ShowsContext: Context<any> = createContext({});

export const ShowsProvider: FC = ({ children }) => {
  const [trending, setTrending] = useState<ShowsResults>();
  const [favorites, setFavorites] = useState<ShowDetails[]>();
  const [page, setPage] = useState(1);

  return (
    <ShowsContext.Provider
      value={{
        trending,
        setTrending,
        favorites,
        setFavorites,
        page,
        setPage,
      }}
    >
      {children}
    </ShowsContext.Provider>
  );
};
