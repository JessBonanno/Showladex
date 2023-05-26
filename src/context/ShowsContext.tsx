import { createContext, useState, Dispatch, SetStateAction, ReactElement, useMemo } from 'react';
import { ShowDetails } from '../ts/showInterfaces';
import { ShowResult } from 'src/ts/apiInterfaces';

type UseState<T> = [T, Dispatch<SetStateAction<T>>];

interface ContextVal {
	trendingShowsState: UseState<ShowResult[] | null>;
	favoritesState: UseState<ShowResult[] | ShowDetails[] | null>;
	showPageState: UseState<number | null>;
	searchResultsState: UseState<ShowResult[] | null>;
}
interface Props {
	children: ReactElement;
}

export const ShowsContext = createContext<ContextVal>(undefined!);

export const ShowsProvider = ({ children }: Props) => {
	const trendingShowsState = useState<ShowResult[] | null>(null);
	const favoritesState = useState<ShowResult[] | ShowDetails[] | null>(null);
	const showPageState = useState<number | null>(1);
	const searchResultsState = useState<ShowResult[] | null>(null);
	const value = useMemo(
		() => ({
			trendingShowsState,
			favoritesState,
			showPageState,
			searchResultsState,
		}),
		[trendingShowsState, favoritesState, showPageState, searchResultsState]
	);

	return <ShowsContext.Provider value={value}>{children}</ShowsContext.Provider>;
};
