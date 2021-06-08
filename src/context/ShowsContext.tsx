import React, {
  FC, Context, createContext, useState,
} from 'react';

export interface IShow {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: [number];
  id: number;
  name: string;
  origin_country: [string];
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  media_type: string;
}
interface IShowsResults {
  page: number;
  results: [IShow]
}

interface ICreator {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
}

interface IGenre {
  id: number;
  name: string;
}

interface IEpisode {
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

interface INetwork {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

interface IProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface ISeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number:number;
}

interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IShowDetails {
    backdrop_path: string;
    created_by: [ICreator];
    episode_run_time: [number];
    first_air_date: string;
    genres: [IGenre];
    homepage: string;
    id: number;
    in_production: boolean,
    languages: [string];
    last_air_date: string;
    last_episode_to_air: IEpisode;
    name: string;
    next_episode_to_air: IEpisode;
    networks: [INetwork];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: [string];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: [IProductionCompany],
    production_countries: [IProductionCountry],
    seasons: [ISeason],
    spoken_languages: [ISpokenLanguage],
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

export const ShowsContext: Context<any> = createContext({});

export const ShowsProvider: FC = ({ children }) => {
  const [trending, setTrending] = useState<IShowsResults>();
  return (
    <ShowsContext.Provider
      value={{
        trending,
        setTrending,
      }}
    >
      {children}
    </ShowsContext.Provider>
  );
};
