import type { AnimeSearchParams } from '@/models/apiParamsModel';

export type AnimeQueryParameters = Partial<AnimeSearchParams>;

export const baseAnimeListQuery: AnimeQueryParameters = {
  sfw: true,
  limit: 10,
  order_by: 'favorites',
  sort: 'desc',
} as const;

export type AppQueries = Omit<AnimeQueryParameters, 'limit' | 'sfw' | 'q'> & { query?: string };

export type AppStringQueries = {
  [K in keyof AppQueries]: string;
};
