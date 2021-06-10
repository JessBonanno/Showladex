import React, {
  FC, Context, createContext, useState,
} from 'react';
import { ShowsResults, ShowDetails, Show } from '../ts/showInterfaces';

export const ShowsContext: Context<any> = createContext({});

export const ShowsProvider: FC = ({ children }) => {
  const [trending, setTrending] = useState<ShowsResults>();
  const [favorites, setFavorites] = useState<ShowDetails[]>();
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState<Show[]>();

  return (
    <ShowsContext.Provider
      value={{
        trending,
        setTrending,
        favorites,
        setFavorites,
        page,
        setPage,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </ShowsContext.Provider>
  );
};
