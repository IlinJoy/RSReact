import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { AnimeList, type AnimeListProps } from '@/components/AnimeList/AnimeList';
import { ANIME_URL } from '@/test-utils/handlers/handlers';
import { server } from '@/test-utils/handlers/server';
import { db } from '@/test-utils/mocks/db';
import { mockPagination } from '@/test-utils/mocks/mockData';
import { setupUserEvent } from '@/test-utils/setupUserEvent';

const setupAnimeList = ({ searchTerm, onError }: Partial<AnimeListProps> = {}) => {
  const onErrorMock = vi.fn();
  return {
    ...setupUserEvent(<AnimeList searchTerm={searchTerm || ''} onError={onError || onErrorMock} />),
    onErrorMock,
  };
};

describe('AnimeList Component', () => {
  describe('Rendering', () => {
    it('should render correct number of items when data is provided', async () => {
      const listItemsLength = db.anime.length;
      setupAnimeList();

      expect(await screen.findAllByRole('article')).toHaveLength(listItemsLength);
    });

    it('should display "Nothing Found" message when data array is empty', async () => {
      server.use(
        http.get(ANIME_URL, () => {
          return HttpResponse.json({ data: [], pagination: mockPagination });
        })
      );
      setupAnimeList();

      expect(await screen.findByText('Nothing Found')).toBeInTheDocument();
    });

    it('should show loading state while fetching data', async () => {
      setupAnimeList();
      expect(screen.getByRole('status')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should display error message and reload button when API call fails', async () => {
      server.use(http.get(ANIME_URL, () => HttpResponse.error()));

      setupAnimeList();

      expect(await screen.findByRole('heading')).toHaveTextContent('Something went wrong.');
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Back To List/i })).toBeInTheDocument();
    });

    it('should call onError callback and reload page when fallback button clicked', async () => {
      server.use(http.get(ANIME_URL, () => HttpResponse.error()));

      const originalLocation = window.location;
      Object.defineProperty(window, 'location', {
        value: { reload: vi.fn() },
        writable: true,
      });

      const { onErrorMock, user } = setupAnimeList();
      const reloadButton = await screen.findByRole('button', { name: /Back To List/i });

      await user.click(reloadButton);

      expect(onErrorMock).toBeCalledWith('');
      expect(onErrorMock).toHaveBeenCalledOnce();
      expect(window.location.reload).toHaveBeenCalled();

      Object.defineProperty(window, 'location', {
        value: originalLocation,
        writable: true,
      });
    });
  });
});
