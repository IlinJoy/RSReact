import { render, screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { baseAnimeListQuery } from '@/api/apiConfig';
import { HomePage } from '@/pages/HomePage/HomePage';
import { storage } from '@/services/localStorage';
import { ANIME_URL } from '@/test-utils/handlers/handlers';
import { server } from '@/test-utils/handlers/server';
import { db } from '@/test-utils/mocks/db';
import { setupUserEvent } from '@/test-utils/setupUserEvent';

const mockedSearchTerm = 'test';

vi.mock('../../services/localStorage.ts', () => ({
  storage: {
    getData: vi.fn(() => mockedSearchTerm),
    setData: vi.fn(),
  },
}));

describe('HomePage Component', () => {
  describe('Integration Tests', () => {
    it('should make initial API call on component mount', async () => {
      let requestCount = 0;

      server.use(
        http.get(ANIME_URL, () => {
          requestCount++;
          return new HttpResponse(null, { status: 200 });
        })
      );

      render(<HomePage />);

      await waitFor(() => expect(requestCount).toBe(1));
    });

    it('should handle search term from storage on initial load', async () => {
      let receivedParams: Record<string, string>;

      server.use(
        http.get(ANIME_URL, ({ request }) => {
          const url = new URL(request.url);
          receivedParams = { q: url.searchParams.get('q') || '' };
          return new HttpResponse(null, { status: 200 });
        })
      );

      render(<HomePage />);

      await waitFor(() => expect(receivedParams.q).toBe(mockedSearchTerm));
      expect(screen.getByRole('textbox')).toHaveValue(mockedSearchTerm);
    });

    it('should save new search term to storage and update state', async () => {
      const { user } = setupUserEvent(<HomePage />);
      const input = screen.getByRole('textbox');
      const newTerm = 'new value';

      await user.clear(input);
      await user.type(input, newTerm);
      await user.keyboard('{enter}');

      expect(storage.setData).toHaveBeenCalledOnce();
      expect(storage.setData).toBeCalledWith(newTerm);
      expect(input).toHaveValue(newTerm);
    });

    it('should manage loading states during API calls', async () => {
      server.use(
        http.get(ANIME_URL, async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return new HttpResponse(null, { status: 200 });
        })
      );

      const { user } = setupUserEvent(<HomePage />);

      expect(screen.getByRole('status')).toBeInTheDocument();
      await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

      const input = screen.getByRole('textbox');

      await user.clear(input);
      await user.type(input, 'new value');
      await user.keyboard('{Enter}');

      expect(screen.getByRole('status')).toBeInTheDocument();
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
            return new HttpResponse(null, { status: 200 });
          })
        );

        render(<HomePage />);

        await waitFor(() => expect(searchParams).toEqual(baseAnimeListQuery));
      });

      it('should handles successful API responses', async () => {
        const anime = db.anime;
        render(<HomePage />);
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
        render(<HomePage />);

        await waitFor(() => {
          expect(
            screen.getByRole('heading', { name: 'Something went wrong.' })
          ).toBeInTheDocument();
        });
        expect(screen.getByRole('button', { name: /Throw Error/i })).toBeInTheDocument();
        expect(screen.queryByRole('article')).not.toBeInTheDocument();
      });
    });
  });
});
