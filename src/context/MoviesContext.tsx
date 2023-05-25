import { createContext, useState, Dispatch, SetStateAction, useMemo, ReactElement } from 'react';
import { MovieResult } from 'src/ts/apiInterfaces';

type UseState<T> = [T, Dispatch<SetStateAction<T>>];

interface ContextVal {
	trendingMoviesState: UseState<MovieResult[] | null>;
	moviePageState: UseState<number | null>;
}

interface Props {
	children: ReactElement;
}

export const MoviesContext = createContext<ContextVal>(undefined!);

export const MoviesProvider = ({ children }: Props) => {
	const trendingMoviesState = useState<MovieResult[] | null>(null);
	const moviePageState = useState<number | null>(1);

	const value = useMemo(
		() => ({
			trendingMoviesState,
			moviePageState,
		}),
		[trendingMoviesState, moviePageState]
	);

	return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
};
