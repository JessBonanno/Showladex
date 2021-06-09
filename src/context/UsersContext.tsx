import React, {
  FC, Context, createContext, useState,
} from 'react';

import { UserDetails } from '../ts/userInterfaces';

export const UsersContext: Context<any> = createContext({});

export const UsersProvider: FC = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [accountDetails, setAccountDetails] = useState<UserDetails>();

  return (
    <UsersContext.Provider
      value={{
        authorized,
        setAuthorized,
        accountDetails,
        setAccountDetails,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
