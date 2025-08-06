import type { ApiImages, ApiResource, ApiTitles, Trailer } from '@models/commonModels';

export interface Anime {
  mal_id: number;
  url: string;
  images: ApiImages;
  trailer: Trailer;
  approved: boolean;
  titles: ApiTitles[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: AnimeType;
  source: string;
  episodes: number | null;
  status: AnimeStatus;
  airing: boolean;
  aired: AnimeAired;
  duration: string;
  rating: AnimeRating;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string;
  background: string;
  season?: AnimeSeason;
  year: number | null;
  broadcast: AnimeBroadcast;
  producers: ApiResource[];
  licensors: ApiResource[];
  studios: ApiResource[];
  genres: ApiResource[];
  explicit_genres: ApiResource[];
  themes: ApiResource[];
  demographics: ApiResource[];
}

export type AnimeType =
  | 'TV'
  | 'Movie'
  | 'Ova'
  | 'Special'
  | 'Ona'
  | 'Music'
  | 'CM'
  | 'PV'
  | 'tv_special';

export type AnimeStatus = 'Finished Airing' | 'Currently Airing' | 'Complete';
export type AnimeRating = 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx';
type AnimeSeason = 'spring' | 'summer' | 'fall' | 'winter';

interface AnimeBroadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

interface AnimeAired {
  from: string;
  to: string;
  prop: {
    from: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
    to: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
  };
  string: string;
}

export type DataType<T> = { data: T };
