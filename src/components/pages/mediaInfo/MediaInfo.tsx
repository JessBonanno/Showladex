import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { usePalette } from 'react-palette';
import styles from './showInfo.module.scss';
import { ShowDetails, Cast } from '../../../ts/showInterfaces';
import Header from './Header';
import ScoreAndTrailer from './ScoreAndTrailer';
import Classification from './Classification';
import Overview from './Overview';
import CastInfo from './cast';
import SimilarShows from './similarShows';
import {
	getMovieCast,
	getMovieDetails,
	getMovieTrailer,
	getShowCast,
	getShowDetails,
	getShowRating,
	getShowTrailer,
} from 'src/utils/API';
import { MovieDetailsResponse } from 'src/ts/apiInterfaces';
import { getContrast } from 'src/utils/helpers';

interface ShowParams {
	id: string;
}

interface Rating {
	iso_3166_1: string;
	rating?: string;
	primary?: string;
	certification?: string;
	release_date?: string;
}

export const MediaInfo = () => {
	const location = useLocation();
	const { id } = useParams<ShowParams>();
	const [show, setShow] = useState<ShowDetails>();
	const [movie, setMovie] = useState<MovieDetailsResponse>();
	const [trailer, setTrailer] = useState<string>('');
	const [rating, setRating] = useState<Rating>();
	const [cast, setCast] = useState<Cast[]>();
	const getShow = async () => {
		try {
			const details = await getShowDetails(id);
			if (details) setShow(details);
			const videos = await getShowTrailer(id);
			if (videos.results[0].key) setTrailer(videos.results[0].key);
			const showRating = await getShowRating(id);
			if (showRating)
				setRating(
					showRating.find((r: Rating) => {
						return r.iso_3166_1 === 'US';
					})
				);
			const credits = await getShowCast(id);
			if (credits) setCast(credits);
		} catch (err) {
			console.error(err);
		}
	};
	const getMovie = async () => {
		try {
			const details = await getMovieDetails(id);
			if (details) setMovie(details);
			const videos = await getMovieTrailer(id);
			if (videos.results[0].key) setTrailer(videos.results[0].key);
			setRating(
				details?.releases?.countries?.find((r: Rating) => {
					return r.iso_3166_1 === 'US';
				})
			);
			const credits = await getMovieCast(id);
			if (credits) setCast(credits);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (location.pathname.includes('show')) {
			getShow();
		} else if (location.pathname.includes('movie')) {
			getMovie();
		}
	}, [location]);

	let bgPath = '';
	if (location.pathname.includes('show')) {
		bgPath = `https://image.tmdb.org/t/p/w500${show && show.poster_path}`;
	} else if (location.pathname.includes('movie')) {
		bgPath = `https://image.tmdb.org/t/p/w500${movie && movie.poster_path}`;
	}

	const { data, loading, error } = usePalette(bgPath);
	
	return (
		<div className={styles.showDetails} style={{ backgroundColor: data.darkMuted, color: getContrast(data.darkMuted) }}>
			<Header
				show={location.pathname.includes('show') ? show : undefined}
				movie={location.pathname.includes('movie') ? movie : undefined}
				color={getContrast(data.darkMuted)}
			/>
			<ScoreAndTrailer
				show={location.pathname.includes('show') ? show : undefined}
				movie={location.pathname.includes('movie') ? movie : undefined}
				trailer={trailer}
				buttonColor={getContrast(data.darkMuted)}
			/>
			<Classification
				show={location.pathname.includes('show') ? show : undefined}
				movie={location.pathname.includes('movie') ? movie : undefined}
				rating={rating && rating.rating ? rating.rating : rating && rating.certification}
			/>
			<Overview
				show={location.pathname.includes('show') ? show : undefined}
				movie={location.pathname.includes('movie') ? movie : undefined}
			/>
			{location.pathname.includes('show') && (
				<SimilarShows show={location.pathname.includes('show') ? show : undefined} />
			)}
			<CastInfo cast={cast} color={getContrast(data.darkMuted)} />
		</div>
	);
};

const MemoizedMediaInfo = React.memo(MediaInfo);

export default () => (
	<MemoizedMediaInfo />
);
