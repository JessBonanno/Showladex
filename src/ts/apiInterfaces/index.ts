import { Collection } from "../movieInterfaces";
import { Genre, ProductionCompany, ProductionCountry, SpokenLanguage } from "../showInterfaces";

export interface ShowResult {
	adult: boolean;
	backdrop_path: string | null;
	first_air_date: string;
	genre_ids: number[];
	id: number;
	media_type?: 'tv' | 'movie';
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

export interface MediaResponse {
	page: number;
	total_results: number;
	total_pages: number;
	results: ShowResult[] | MovieResult[];
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

export interface Countries {
    iso_3166_1: string;
    certification: string;
    release_date: string;
    type: number;
};

export interface Releases {
    countries: Countries[] | null;
}
export interface MovieDetailsResponse {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection: Collection | null;
	budget: number;
	genres: Genre[];
	homepage: string | null;
	id: number;
	imdb_id: string | null;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	production_companies: ProductionCompany[] | null;
	production_countries: ProductionCountry[] | null;
	release_date: string;
	releases: Releases | null;
	revenue: number;
	runtime: number | null;
	spoken_languages: SpokenLanguage[] | null;
	status: string;
	tagline: string | null;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
