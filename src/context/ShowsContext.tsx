import React, {
  FC, Context, createContext, useState,
} from 'react';
import { ShowsResults } from '../ts/showInterfaces';

export const ShowsContext: Context<any> = createContext({});

export const ShowsProvider: FC = ({ children }) => {
  const [trending, setTrending] = useState<ShowsResults>();
  return (
    <ShowsContext.Provider
      value={{
        trending,
        setTrending,
      }}
    >
      {children}
    </ShowsContext.Provider>
  );
};
