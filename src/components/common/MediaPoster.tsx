import React, { FC, SetStateAction, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './mediaPoster.module.scss';
import { Show } from '../../ts/showInterfaces';
import { Movie } from '../../ts/movieInterfaces';
import { ShowsContext, ShowsProvider } from '../../context/ShowsContext';

interface Props {
	show: Show | null;
	movie: Movie | null;
	setShows: React.Dispatch<SetStateAction<Show[]>> | undefined;
}

export const MediaPoster: FC<Props> = ({ show, movie, setShows }) => {
	const { searchResultsState } = useContext(ShowsContext);
	const [searchResults, setSearchResults] = searchResultsState;

	return (
		<div className={styles.card}>
			{((show && show.poster_path !== null) || (movie && movie.poster_path !== null)) && (
				<>
					<Link
						to={show ? `/show/${show.id}` : `/movie/${movie && movie.id}`}
						onClick={() => {
							setSearchResults(null);
							if (setShows !== undefined) {
								setShows([]);
							}
						}}
					>
						<img
							src={`https://image.tmdb.org/t/p/original${
								show ? show.poster_path : movie && movie.poster_path
							}`}
							alt={`${show ? show.name : movie && movie.title}`}
						/>
					</Link>
				</>
			)}
		</div>
	);
};

const MemoizedMediaPoster = React.memo(MediaPoster);

export default ({show, movie, setShows}) => (
	<ShowsProvider>
		<MemoizedMediaPoster show={show} movie={movie} setShows={setShows}/>
	</ShowsProvider>
);
