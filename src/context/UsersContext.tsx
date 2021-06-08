import React, {
  FC, Context, createContext, useState,
} from 'react';

export const UsersContext: Context<any> = createContext({});

export const UsersProvider: FC = ({ children }) => {
  const [userToken, setUserToken] = useState('');
  return (
    <UsersContext.Provider
      value={{
        userToken,
        setUserToken,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
