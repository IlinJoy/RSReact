import type { QueryParameters } from '@/api/baseApi';

export const API_CONFIG = {
  BASE_URL: 'https://api.jikan.moe',
  VERSION: '/v4',
  ENDPOINTS: {
    ANIME: '/anime',
  },
} as const;

export const baseAnimeListQuery: QueryParameters = {
  sfw: true,
  limit: 10,
  order_by: 'favorites',
  sort: 'desc',
} as const;
