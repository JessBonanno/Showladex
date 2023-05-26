import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { usePalette } from 'react-palette';
import styles from './showInfo.module.scss';
import { ShowDetails, Cast } from '../../../ts/showInterfaces';
import Header from './Header';
import ScoreAndTrailer from './ScoreAndTrailer';
import Classification from './Classification';
import Overview from './Overview';
import CastInfo from './cast/CastInfo';
import SimilarShows from './similarShows/SimilarShows';
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

interface Props {
	id: string;
	isMovie?: boolean;
}

interface Rating {
	iso_3166_1: string;
	rating?: string;
	primary?: string;
	certification?: string;
	release_date?: string;
}

export const MediaInfo = ({ id, isMovie = false }: Props) => {
	const location = useLocation();
	if (location.pathname.includes('movie')) isMovie = true;
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
		if (isMovie) {
			getMovie();
		} else {
			getShow();
		}
	}, [id]);

	let bgPath = '';
	if (isMovie) {
		bgPath = `https://image.tmdb.org/t/p/w500${movie && movie.poster_path}`;
	} else {
		bgPath = `https://image.tmdb.org/t/p/w500${show && show.poster_path}`;
	}

	const { data, loading, error } = usePalette(bgPath);
	return (
		<div
			className={styles.showDetails}
			style={{ backgroundColor: data.darkMuted, color: getContrast(data.darkMuted) }}
		>
			<Header show={show} movie={movie} color={getContrast(data.darkMuted)} />
			<ScoreAndTrailer show={show} movie={movie} trailer={trailer} buttonColor={getContrast(data.darkMuted)} />
			<Classification show={show} movie={movie} rating={rating?.rating ? rating.rating : rating?.certification} />
			<Overview show={show} movie={movie} />
			{location.pathname.includes('show') && (
				<SimilarShows show={location.pathname.includes('show') ? show : undefined} />
			)}
			<CastInfo cast={cast} color={getContrast(data.darkMuted)} />
		</div>
	);
};

export default MediaInfo;
