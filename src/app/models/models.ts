export interface slider {
  image: string | undefined;
  thumbImage: string | undefined;
}

export interface ApiResponse {
  dates?: Date;
  page?: number;
  results: Shows[];
  total_pages?: number;
  total_results: number;
}

export interface Date {
  maximum: string;
  minimum: string;
}
export interface GenreDetails {
  id: number;
  name: string;
  selected?: boolean;
}

export interface Genres {
  genres: GenreDetails[];
}
export interface Shows {
  backdrop_path?: string;
  first_air_date?: string;
  genre_ids?: number[];
  id?: number;
  name?: string;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
  adult?: boolean;
  original_title?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  media_type?: string;
}
