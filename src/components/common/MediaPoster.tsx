import React, { FC, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import styles from './mediaPoster.module.scss';
import { Show } from '../../ts/showInterfaces';
import { Movie } from '../../ts/movieInterfaces';

interface Props {
	show: Show | null;
	movie: Movie | null;
	setShows: React.Dispatch<SetStateAction<Show[]>> | undefined;
}

export const MediaPoster: FC<Props> = ({ show, movie, setShows }) => {

	return (
		<div className={styles.card}>
			{((show && show.poster_path !== null) || (movie && movie.poster_path !== null)) && (
				<>
					<Link
						to={show ? `/show/${show.id}` : `/movie/${movie && movie.id}`}
						onClick={() => {
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

export default MediaPoster;
