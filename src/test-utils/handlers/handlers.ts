import { http, HttpResponse } from 'msw';

import { API_CONFIG } from '@/api/apiConfig';

import { db } from '../mocks/db';

export const ANIME_URL =
  API_CONFIG.BASE_URL + API_CONFIG.VERSION + API_CONFIG.ENDPOINTS.ANIME;

export const handlers = [
  http.get(ANIME_URL, () => {
    return HttpResponse.json({
      ...db.paginatedAnimeList,
    });
  }),

  http.get(`${ANIME_URL}/:id`, ({ params }) => {
    const anime = db.anime.find((item) => item.mal_id === Number(params.id));

    if (!anime) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(anime);
  }),
];
