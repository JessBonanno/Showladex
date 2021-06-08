import React, {
  FC, Context, createContext, useState,
} from 'react';

export const UsersContext: Context<any> = createContext({});

export const UsersProvider: FC = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);

  return (
    <UsersContext.Provider
      value={{
        authorized,
        setAuthorized,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
