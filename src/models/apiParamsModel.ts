import type { AnimeRating, AnimeStatus, AnimeType } from './animeModel';

export interface ApiSearchParams {
  unapprove: boolean;
  page: number;
  limit: number;
  q: string;
  type: AnimeType;
  score: number;
  min_score: number;
  max_score: number;
  status: AnimeStatus;
  rating: AnimeRating;
  sfw: boolean;
  genres: string;
  genres_exclude: string;
  order_by: OrderBy;
  sort: SortBY;
  letter: string;
  producers: string;
  start_date: string;
  end_date: string;
}

type OrderBy =
  | 'mal_id'
  | 'title'
  | 'start_date'
  | 'end_date'
  | 'episodes'
  | 'score'
  | 'scored_by'
  | 'rank'
  | 'popularity'
  | 'members'
  | 'favorites';

type SortBY = 'desc' | 'asc';
