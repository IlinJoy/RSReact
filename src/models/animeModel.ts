import type {
  ApiImages,
  ApiResource,
  ApiTitles,
  Trailer,
} from './commonModels';

export interface Anime {
  mal_id: number;
  url: string;
  images: ApiImages;
  trailer: Trailer;
  approved: true;
  titles: ApiTitles[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: AnimeType;
  source: string;
  episodes: number;
  status: AnimeStatus;
  airing: true;
  aired: AnimeAired;
  duration: string;
  rating: AnimeRating;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season?: AnimeSeason;
  year: number;
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
  | 'tv'
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
      day: number;
      month: number;
      year: number;
    };
    to: {
      day: number;
      month: number;
      year: number;
    };
    string: string;
  };
}
