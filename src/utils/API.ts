import axios from 'axios';
import { MediaResponse, MovieDetailsResponse } from 'src/ts/apiInterfaces';
import { ShowDetails } from 'src/ts/showInterfaces';
import { UserDetails } from 'src/ts/userInterfaces';

/*
Auth api calls
*/
export const getUserToken = async () => {
	try {
		const tokenData = await axios.get(
			`https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`
		);
		localStorage.setItem('movieToken', tokenData.data.request_token);

		window.location.replace(
			`https://www.themoviedb.org/authenticate/${tokenData.data.request_token}?redirect_to=${process.env.REACT_APP_URL}`
		);
		return null;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getSession = async (token: string) => {
	try {
		const session = await axios.post(
			`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`,
			{ request_token: token }
		);
		if (session.data.success) {
			localStorage.setItem('session', session.data.session_id);
			localStorage.removeItem('movieToken');
			return true;
		}
		return false;
	} catch (err) {
		console.error(err);
	}
	return false;
};

export const endSession = async (token: string) => {
	try {
		const session = await axios.delete(
			`https://api.themoviedb.org/3/authentication/session?api_key=${process.env.REACT_APP_API_KEY}`,
			{ data: { session_id: token } }
		);
		if (session.data.success) {
			localStorage.removeItem('movieToken');
			localStorage.removeItem('session');
			return true;
		}
		return false;
	} catch (err) {
		console.error(err);
	}
	return false;
};

export const getAccountDetails = async () => {
	try {
		const details = await axios.get(
			`https://api.themoviedb.org/3/account?api_key=${
				process.env.REACT_APP_API_KEY
			}&session_id=${localStorage.getItem('session')}`
		);
		if (details) {
			return details.data;
		}
		return false;
	} catch (err) {
		console.error(err);
	}
	return false;
};

/*
Show & movie api calls
*/

export const searchShows = async (searchTerm: string): Promise<MediaResponse | null> => {
	try {
		const shows = await axios.get(
			`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&query=${searchTerm}&include_adult=false`
		);
		return shows.data;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getTrendingShows = async (page: string): Promise<MediaResponse | null> => {
	try {
		const shows = await axios.get(
			`https://api.themoviedb.org/3/trending/tv/day?page=${page}&api_key=${process.env.REACT_APP_API_KEY}`
		);
		return shows.data;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getTrendingMovies = async (page: string): Promise<MediaResponse | null> => {
	try {
		const movies = await axios.get(
			`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`
		);
		return movies.data;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getShowDetails = async (id: string): Promise<ShowDetails | null> => {
	try {
		const details = await axios.get(
			`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		return details.data;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getMovieDetails = async (id: string): Promise<MovieDetailsResponse | null> => {
	try {
		const details = await axios.get(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=releases`
		);
		return details.data;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getShowTrailer = async (id: string) => {
	try {
		const videos = await axios.get(
			`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
		);
		return videos.data;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getMovieTrailer = async (id: string) => {
	try {
		const videos = await axios.get(
			`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
		);
		return videos.data;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getShowRating = async (id: string) => {
	try {
		const ratings = await axios.get(
			`https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${process.env.REACT_APP_API_KEY}`
		);
		return ratings.data.results;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getShowCast = async (id: string) => {
	try {
		const credits = await axios.get(
			`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		if (credits.data.cast) {
			return credits.data.cast;
		}
		return null;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getMovieCast = async (id: string) => {
	try {
		const credits = await axios.get(
			`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		if (credits.data.cast) {
			return credits.data.cast;
		}
		return null;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getActorDetails = async (id: string) => {
	try {
		const actor = await axios.get(
			`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=images`
		);
		if (actor.data) {
			return actor.data;
		}
		return null;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getSimilarShows = async (id: string) => {
	try {
		const shows = await axios.get(
			`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
		);
		if (shows) {
			return shows.data.results;
		}
		return null;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getRandomPopularImg = async () => {
	const randomImgNumber = Math.floor(Math.random() * 19 + 1);
	const randomPageNumber = Math.floor(Math.random() * 6 + 1);
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${randomPageNumber}`
		);
		if (response.data) {
			return response.data.results[randomImgNumber].backdrop_path;
		}
		return null;
	} catch (err) {
		console.error(err);
	}
	return null;
};
/*
User Actions API calls
*/

export const markFavorite = async (id: number, favorite: boolean, accountDetails: UserDetails) => {
	try {
		const response = await axios.post(
			`https://api.themoviedb.org/3/account/${accountDetails.id}/favorite?api_key=${
				process.env.REACT_APP_API_KEY
			}&session_id=${localStorage.getItem('session')}`,
			{
				media_type: 'tv',
				media_id: id,
				favorite,
			}
		);
		return response;
	} catch (err) {
		console.error(err);
	}
	return null;
};

export const getFavorites = async () => {
	if (localStorage.getItem('accountId')) {
		const id = localStorage.getItem('accountId');
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/account/${id} /favorite/tv?api_key=${
					process.env.REACT_APP_API_KEY
				}&language=en-US&session_id=${localStorage.getItem('session')}&sort_by=created_at.asc&page=1`
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	}
	return null;
};
