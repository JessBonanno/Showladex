import React, { useContext, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import { MoviesContext, MoviesProvider } from '../../../context/MoviesContext';
import { ShowsContext, ShowsProvider } from '../../../context/ShowsContext';
import { Movie } from '../../../ts/movieInterfaces';
import { Show } from '../../../ts/showInterfaces';
import MediaPoster from '../../common/MediaPoster';
import styles from './trending.module.scss';
import { getTrendingMovies, getTrendingShows } from 'src/utils/API';
import { MovieResult, ShowResult } from 'src/ts/apiInterfaces';

const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 25];

export const Trending = () => {
	const ref = useRef();

	const { trendingShowsState } = useContext(ShowsContext);
	const { trendingMoviesState } = useContext(MoviesContext);
	const [trendingShows, setTrendingShows] = trendingShowsState;
	const [trendingMovies, setTrendingMovies] = trendingMoviesState;
	const [id, setId] = useState<number | null>(null);
	const [isMovie, setIsMovie] = useState<boolean>(false);

	/**
	 * Infinite scroll state
	 */
	const [pageNumber, setPageNumber] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const getShows = async () => {
		const shows = await getTrendingShows(pageNumber.toString());
		if (shows?.results) {
			setTrendingShows(shows.results as ShowResult[]);
			setPageNumber(pageNumber + 1);
		}
	};

	const getMovies = async () => {
		const movies = await getTrendingMovies(pageNumber.toString());
		if (movies?.results) {
			setTrendingMovies(movies.results as MovieResult[]);
			setPageNumber(pageNumber + 1);
		}
	};

	useEffect(() => {
		getShows();
		getMovies();
	}, []);

	return (
		<div className={styles.trending}>
			<div className={styles.heading}>
				<h2>Trending in TV</h2>
			</div>
			<div>
				<InfiniteScroll
					height="260px"
					className={styles.cardContainer}
					dataLength={(trendingShows && trendingShows.length) || [].length}
					next={getShows}
					hasMore={hasMore}
					loader={dummyArray.map(number => {
						return <div key={uuidv4()} className={styles.skeleton}></div>;
					})}
				>
					{trendingShows &&
						trendingShows.length > 0 &&
						trendingShows.map((result: Show) => {
							return (
								<MediaPoster
									show={result}
									movie={null}
									key={uuidv4()}
									setShows={undefined}
								/>
							);
						})}
				</InfiniteScroll>
			</div>
			<div className={styles.heading}>
				<h2>Trending in Movies</h2>
			</div>
			<div>
				<InfiniteScroll
					height="260px"
					className={styles.cardContainer}
					dataLength={(trendingMovies && trendingMovies?.length) || [].length}
					next={getMovies}
					hasMore={hasMore}
					loader={dummyArray.map(number => {
						return <div key={uuidv4()} className={styles.skeleton}></div>;
					})}
				>
					{trendingMovies &&
						trendingMovies?.length > 0 &&
						trendingMovies?.map((result: Movie) => {
							return (								
									<MediaPoster
										show={null}
										movie={result}
										key={uuidv4()}
										setShows={undefined}
									/>
							);
						})}
				</InfiniteScroll>
			</div>
		</div>
	);
};

const MemoizedTrending = React.memo(Trending);

export default () => (
	<MoviesProvider>
		<ShowsProvider>
			<MemoizedTrending />
		</ShowsProvider>
	</MoviesProvider>
);
