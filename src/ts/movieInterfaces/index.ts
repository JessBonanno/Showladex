
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

