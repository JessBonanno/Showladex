import {
  createContext, useState, Dispatch, SetStateAction, ReactElement, useMemo,
} from 'react';
import { ShowsResults, ShowDetails, Show } from '../ts/showInterfaces';

type UseState<T> = [T, Dispatch<SetStateAction<T>>];

interface ContextVal {
  trendingState: UseState<ShowsResults | null>;
  favoritesState: UseState<ShowDetails[] | null>;
  showPageState: UseState<number | null>;
  searchResultsState: UseState<Show[] | null>;
}
interface Props {
	children: ReactElement;
}

export const ShowsContext = createContext<ContextVal>(undefined!);


export const ShowsProvider = ({ children }: Props) => {
  const trendingState = useState<ShowsResults | null>(null);
  const favoritesState = useState<ShowDetails[] | null>(null);
  const showPageState = useState<number | null>(1);
  const searchResultsState = useState<Show[] | null>(null);

  const value = useMemo(
    () => ({
      trendingState,
      favoritesState,
      showPageState,
      searchResultsState,
    }),
    [
      trendingState,
      favoritesState,
      showPageState,
      searchResultsState,
    ]
  )

  return <ShowsContext.Provider value={value}>{children}</ShowsContext.Provider>;

};
