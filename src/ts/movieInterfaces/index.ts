import {
  ProductionCompany, ProductionCountry, SpokenLanguage, Genre,
} from '../showInterfaces';

export interface Movie {
  backdrop_path: string | null;
  genre_ids?: number[];
  original_language: string;
  original_title: string;
  poster_path: string | null;
  video: boolean,
  vote_average: number;
  vote_count: number;
  overview: string;
  release_date: string;
  title: string;
  id: number;
  adult: boolean;
  popularity: number;
  media_type?: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Country {
  certification: string;
  iso_3166_1: string;
  primary: string;
  release_date: string;
}

export interface MovieDetails extends Movie {
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string,
  production_companies: ProductionCompany[],
  production_countries: ProductionCountry[],
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[],
  status: string;
  tagline: string;
  releases: Country[];
}
