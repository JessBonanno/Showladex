import React, { FC, Context, createContext } from 'react';
import { ShowsProvider } from './ShowsContext';
import { MoviesProvider } from './MoviesContext';
import { UsersProvider } from './UsersContext';
import { APIProvider } from './APIContext';
import { NavigationProvider } from './NavigationContext';

export const RootContext: Context<any> = createContext({});

export const RootProvider:FC = ({ children }) => {
  return (
    <UsersProvider>
      <NavigationProvider>
        <ShowsProvider>
          <MoviesProvider>
            <APIProvider>
              <RootContext.Provider
                value={{}}
              >
                {children}
              </RootContext.Provider>
            </APIProvider>
          </MoviesProvider>
        </ShowsProvider>
      </NavigationProvider>
    </UsersProvider>
  );
};
