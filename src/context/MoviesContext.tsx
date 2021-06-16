import React, {
  FC, Context, createContext, useState,
} from 'react';
import { MoviesResults } from '../ts/movieInterfaces';

export const MoviesContext: Context<any> = createContext({});

export const MoviesProvider: FC = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState<MoviesResults>();
  const [page, setPage] = useState(1);

  return (
    <MoviesContext.Provider
      value={{
        trendingMovies,
        setTrendingMovies,
        page,
        setPage,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
