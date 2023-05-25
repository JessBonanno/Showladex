export interface ShowResult {
	adult: boolean;
	backdrop_path: string | null;
	first_air_date: string;
	genre_ids: number[];
	id: number;
	media_type: 'tv' | 'movie';
	name: string;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	vote_average: number;
	vote_count: number;
}

export interface TrendingShowsResult {
	page: number;
	total_results: number;
	total_pages: number;
	results: ShowResult[];
}

export interface MovieResult {
	adult: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
    media_type: 'tv' | 'movie';
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface TrendingMoviesResult {
	page: number;
	total_results: number;
	total_pages: number;
	results: MovieResult[];
}
