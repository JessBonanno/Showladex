export interface Show {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids?: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  media_type?: string;
  created_by?: Creator[];
  episode_run_time?: number[];
  genres?: Genre[];
  homepage?: string;
  in_production?: boolean,
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: Episode;
  next_episode_to_air?: Episode;
  networks?: Network[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  production_companies?: ProductionCompany[],
  production_countries?: ProductionCountry[],
  seasons?: Season[],
  spoken_languages?: SpokenLanguage[],
  status?: string;
  tagline?: string;
  type?: string;

}

export interface Creator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Episode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: 1,
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number:number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ShowDetails extends Show {
  created_by: Creator[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean,
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  next_episode_to_air: Episode;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ProductionCompany[],
  production_countries: ProductionCountry[],
  seasons: Season[],
  spoken_languages: SpokenLanguage[],
  status: string;
  tagline: string;
  type: string;
}

export interface Cast {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  character: string;
  credit_id: string;
  order: number;
}

export interface Profile {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Images {
  profiles: Profile[];
}
export interface ActorDetails extends Cast{
  birthday: string | null;
  deathday: string | null;
  also_known_as: string[];
  biography: string;
  place_of_birth: string | null;
  profile_path: string | null;
  homepage: string | null;
  images: Images;
  imdb_id: string;
}

