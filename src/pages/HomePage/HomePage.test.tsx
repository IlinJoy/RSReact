import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { baseAnimeListQuery } from '@/api/apiConfig';
import { ANIME_URL } from '@/test-utils/handlers/handlers';
import { server } from '@/test-utils/handlers/server';
import { db } from '@/test-utils/mocks/db';
import { setupUserEvent } from '@/test-utils/setupUserEvent';

import { storage } from '../../services/localStorage.ts';
import { HomePage } from './HomePage';

const mockedSearchTerm = 'test';

vi.mock('../../services/localStorage.ts', () => ({
  storage: {
    getData: vi.fn(() => mockedSearchTerm),
    setData: vi.fn(),
  },
}));

describe('HomePage Component', () => {
  afterEach(() => {
    localStorage.clear();
  });

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

      await waitFor(() => {
        expect(requestCount).toBe(1);
      });
    });

    it('should handle search term from localStorage on initial load', async () => {
      let receivedParams: Record<string, string>;

      server.use(
        http.get(ANIME_URL, ({ request }) => {
          const url = new URL(request.url);
          receivedParams = {
            q: url.searchParams.get('q') || '',
          };
          return new HttpResponse(null, { status: 200 });
        })
      );

      render(<HomePage />);

      await waitFor(() => {
        expect(receivedParams.q).toBe(mockedSearchTerm);
      });
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
      await waitFor(() => {
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
      });

      const input = screen.getByRole('textbox');

      await user.clear(input);
      await user.type(input, 'new value');
      await user.keyboard('{Enter}');

      expect(screen.getByRole('status')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
      });
    });
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

      await waitFor(() => {
        expect(searchParams).toEqual(baseAnimeListQuery);
      });
    });

    it('should handles successful API responses', async () => {
      const anime = db.anime;
      render(<HomePage />);

      await waitFor(() => {
        anime
          .map((item) => item.title_english || item.title)
          .forEach((title) => {
            expect(screen.getByText(title)).toBeInTheDocument();
          });
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
      expect(
        screen.getByRole('button', { name: /Throw Error/i })
      ).toBeInTheDocument();
      expect(screen.queryByRole('article')).not.toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('should manage search term state correctly', async () => {
      const { user } = setupUserEvent(<HomePage />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveValue(mockedSearchTerm);

      await user.clear(input);
      await user.keyboard('{Enter}');

      expect(input).toHaveValue('');
    });

    it('should updates component state after fetch error', async () => {
      const originalLocation = window.location;
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: { reload: vi.fn() },
      });
      server.use(http.get(ANIME_URL, () => HttpResponse.error()));
      const { user } = setupUserEvent(<HomePage />);

      const resetButton = await screen.findByRole('button', {
        name: /Back To List/i,
      });

      await user.click(resetButton);

      expect(storage.setData).toHaveBeenCalledWith('');
      expect(window.location.reload).toHaveBeenCalled();

      Object.defineProperty(window, 'location', {
        configurable: true,
        value: originalLocation,
      });
    });
  });
});
