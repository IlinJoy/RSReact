import type { QueryParameters } from './baseApi';

export const API_CONFIG = {
  BASE_URL: 'https://api.jikan.moe',
  VERSION: '/v4',
  ENDPOINTS: {
    ANIME: '/anime',
  },
} as const;

export const baseAnimeListQuery: QueryParameters = {
  sfw: true,
  limit: 20,
  order_by: 'favorites',
  sort: 'desc',
} as const;
