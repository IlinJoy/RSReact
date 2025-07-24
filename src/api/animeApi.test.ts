import { http, HttpResponse } from 'msw';

import { ERROR_MESSAGES } from '@/constants/messages';
import { ANIME_URL } from '@/test-utils/handlers/handlers';
import { server } from '@/test-utils/handlers/server';
import { db } from '@/test-utils/mocks/db';

import { animeApi } from './animeApi';

describe('AnimeApi', () => {
  describe('Success Scenarios', () => {
    it('should return anime list', async () => {
      const response = await animeApi.getAnimeList();
      expect(response).toEqual(db.paginatedAnimeList);
    });

    it('should return anime with details by id', async () => {
      const response = await animeApi.getAnimeDetails(1);
      expect(response).toEqual(db.anime[1]);
    });
  });

  describe('Errors Scenarios', () => {
    it('should throw error message on server error', async () => {
      server.use(http.get(ANIME_URL, () => new HttpResponse(null, { status: 502 })));
      await expect(animeApi.getAnimeList({})).rejects.toThrow(ERROR_MESSAGES.FETCH);
    });

    it('should throw on network error', async () => {
      server.use(http.get(ANIME_URL, () => HttpResponse.error()));
      await expect(animeApi.getAnimeList()).rejects.toThrow();
    });

    it('should throw if there no anime with chosen id', async () => {
      await expect(animeApi.getAnimeDetails(666)).rejects.toThrow();
    });
  });
});
