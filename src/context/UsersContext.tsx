import React, {
  FC, Context, createContext, useState,
} from 'react';

interface IUserDetails {
  avatar: IAvatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}
interface IAvatar {
  gravatar: {hash: string};
  tmdb: {avatar_path: string | null};
}

export const UsersContext: Context<any> = createContext({});

export const UsersProvider: FC = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [accountDetails, setAccountDetails] = useState<IUserDetails>();

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
