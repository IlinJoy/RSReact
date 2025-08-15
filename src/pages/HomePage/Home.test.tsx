import { screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { baseAnimeListQuery } from '@/store/api/anime/config';
import { generateMockData, withPagination } from '@/test-utils/generateMockData';
import { ANIME_URL } from '@/test-utils/handlers/handlers';
import { server } from '@/test-utils/handlers/server';
import { db } from '@/test-utils/mocks/db';
import { setupWithRouter } from '@/test-utils/setupRender';
import { STORAGE_KEYS } from '@/utils/localStorageUtils';

let mockedSearchTerm: string;

const mockSetValue = vi.fn((newValue) => {
  mockedSearchTerm = newValue;
});

const mockGetValue = vi.fn(() => JSON.stringify(mockedSearchTerm));

vi.stubGlobal('localStorage', {
  setItem: mockSetValue,
  getItem: mockGetValue,
});

describe('HomePage Component', () => {
  beforeEach(() => {
    mockedSearchTerm = 'test';
  });

  describe('Integration Tests', () => {
    it('should make initial API call on component mount', async () => {
      let requestCount = 0;

      server.use(
        http.get(ANIME_URL, () => {
          requestCount++;
          return HttpResponse.json(db.paginatedAnimeList);
        })
      );

      setupWithRouter();

      await waitFor(() => expect(requestCount).toBe(1));
    });

    it('should handle search term from storage on initial load', async () => {
      let receivedParams: Record<string, string>;

      server.use(
        http.get(ANIME_URL, ({ request }) => {
          const url = new URL(request.url);
          receivedParams = { q: url.searchParams.get('q') || '' };
          return HttpResponse.json(db.paginatedAnimeList);
        })
      );

      setupWithRouter();

      await waitFor(() => expect(receivedParams.q).toBe(mockedSearchTerm));
      expect(await screen.findByRole('textbox')).toHaveValue(mockedSearchTerm);
    });

    it('should save new search term to storage and update state', async () => {
      const { user } = setupWithRouter();
      const input = await screen.findByRole('textbox');
      const newTerm = 'new value';

      await user.clear(input);
      await user.type(input, newTerm);
      await user.keyboard('{enter}');

      expect(mockSetValue).toHaveBeenCalledOnce();
      expect(mockSetValue).toBeCalledWith(
        STORAGE_KEYS.PREFIX + STORAGE_KEYS.ANIME,
        JSON.stringify(newTerm)
      );
      expect(input).toHaveValue(newTerm);
    });

    it('should manage loading states during API calls', async () => {
      server.use(
        http.get(ANIME_URL, async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return HttpResponse.json(withPagination([generateMockData()]));
        })
      );

      const { user } = setupWithRouter();

      expect(screen.getByRole('status')).toBeInTheDocument();
      await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

      const input = screen.getByRole('textbox');

      await user.clear(input);
      await user.type(input, 'new value');
      await user.keyboard('{Enter}');

      expect(await screen.findByRole('status')).toBeInTheDocument();
      await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
    });

    describe('API Integration', () => {
      it('should call API with correct parameters', async () => {
        let searchParams: Record<string, string | number | boolean>;

        server.use(
          http.get(ANIME_URL, ({ request }) => {
            const url = new URL(request.url);
            searchParams = {
              limit: Number(url.searchParams.get('limit')),
              order_by: url.searchParams.get('order_by') || '',
              sfw: url.searchParams.get('sfw') === 'true',
              sort: url.searchParams.get('sort') || '',
            };
            return HttpResponse.json(db.paginatedAnimeList);
          })
        );

        setupWithRouter();

        await waitFor(() => expect(searchParams).toEqual(baseAnimeListQuery));
      });

      it('should handles successful API responses', async () => {
        const anime = db.anime;
        setupWithRouter();
        const cards = await screen.findAllByRole('article');

        cards.forEach((card, index) => {
          const { getByText } = within(card);
          const title = anime[index].title_english || anime[index].title;
          expect(getByText(title)).toBeInTheDocument();
        });
        expect(screen.getByRole('textbox')).toHaveValue(mockedSearchTerm);
      });

      it('should handles API error responses', async () => {
        server.use(http.get(ANIME_URL, () => HttpResponse.error()));
        setupWithRouter();

        await waitFor(() => {
          expect(
            screen.getByRole('heading', { name: 'Something went wrong.' })
          ).toBeInTheDocument();
        });
        expect(screen.queryByRole('article')).not.toBeInTheDocument();
      });
    });
  });
});
