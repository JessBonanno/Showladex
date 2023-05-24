import {
  createContext, useState, Dispatch, SetStateAction, ReactElement, useMemo,
} from 'react';

import { UserDetails } from '../ts/userInterfaces';


type UseState<T> = [T, Dispatch<SetStateAction<T>>];

interface ContextVal {
  authorizedState: UseState<boolean | null>;
  accountDetailsState: UseState<UserDetails | null>;
}
interface Props {
	children: ReactElement;
}

export const UsersContext = createContext<ContextVal>(undefined!);

export const UsersProvider = ({ children }: Props) => {
  const authorizedState = useState<boolean | null >(false);
  const accountDetailsState = useState<UserDetails | null>(null);

  const value = useMemo(
    () => ({
      authorizedState,
      accountDetailsState,
    }),
    [
      authorizedState,
      accountDetailsState,
    ]
  )

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;

};
