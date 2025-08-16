import type { AnimeSearchParams } from '@/models/apiParamsModel';

export const API_CONFIG = {
  BASE_URL: 'https://api.jikan.moe',
  VERSION: '/v4',
  ENDPOINTS: {
    ANIME: '/anime',
  },
} as const;

export const baseAnimeListQuery: AnimeQueryParameters = {
  sfw: true,
  limit: 10,
  order_by: 'favorites',
  sort: 'desc',
} as const;

export const tagMap = {
  list: 'List',
  details: (id: number | string) => `Details-${id}`,
};

export type AnimeQueryParameters = Partial<AnimeSearchParams>;

export type AppQueries = Omit<AnimeQueryParameters, 'limit' | 'sfw' | 'q'> & { query?: string };

type ObjectWithStringValues<T> = {
  [K in keyof T]: string;
};

export type AppStringQueries = ObjectWithStringValues<AppQueries>;

export type AnimeQueryStringParameters = ObjectWithStringValues<AnimeQueryParameters>;
