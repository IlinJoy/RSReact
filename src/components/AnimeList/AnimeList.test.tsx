import { screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { MESSAGES } from '@/constants/messages';
import { generateMockData } from '@/test-utils/generateMockData';
import { ANIME_URL } from '@/test-utils/handlers/handlers';
import { server } from '@/test-utils/handlers/server';
import { db } from '@/test-utils/mocks/db';
import { mockPagination } from '@/test-utils/mocks/mockData';
import { setupUserEvent } from '@/test-utils/setupUserEvent';

import { AnimeList, type AnimeListProps } from './AnimeList';

const setupAnimeList = (props: Partial<AnimeListProps> = {}) => {
  const onErrorMock = vi.fn();
  return {
    ...setupUserEvent(
      <AnimeList
        searchTerm={props.searchTerm || ''}
        onError={props.onError || onErrorMock}
      />
    ),
    onErrorMock,
  };
};

describe('AnimeList Component', () => {
  describe('Rendering', () => {
    it('should render correct number of items when data is provided', async () => {
      const listItemsLength = db.anime.length;
      setupAnimeList();

      expect(await screen.findAllByRole('article')).toHaveLength(
        listItemsLength
      );
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

  describe('Data Display', () => {
    it('should correctly display item names and descriptions', async () => {
      const anime = db.anime;
      setupAnimeList();
      const cards = await screen.findAllByRole('article');

      for (let i = 0; i < db.anime.length; i++) {
        const { getByText } = within(cards[i]);
        const currentAnime = anime[i];

        expect(
          getByText(currentAnime.title_english || currentAnime.title)
        ).toBeInTheDocument();
        expect(getByText(currentAnime.status));
      }
    });

    it('should handle missing or undefined data gracefully', async () => {
      const animeWithMissingData = {
        title: 'Title',
        title_english: undefined,
        scored_by: null,
      };

      server.use(
        http.get(ANIME_URL, () => {
          return HttpResponse.json({
            data: [generateMockData(animeWithMissingData)],
            pagination: mockPagination,
          });
        })
      );

      setupAnimeList();

      expect(await screen.findByRole('article')).toHaveTextContent(
        animeWithMissingData.title
      );
      expect(screen.getByText(MESSAGES.NO_RATING)).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should display error message and reload button when API call fails', async () => {
      server.use(http.get(ANIME_URL, () => HttpResponse.error()));

      setupAnimeList();

      expect(await screen.findByRole('heading')).toHaveTextContent(
        'Something went wrong.'
      );
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Back To List/i })
      ).toBeInTheDocument();
    });

    it('should call onError callback and reload page when fallback button clicked', async () => {
      server.use(http.get(ANIME_URL, () => HttpResponse.error()));

      const originalLocation = window.location;
      Object.defineProperty(window, 'location', {
        value: { reload: vi.fn() },
        writable: true,
      });

      const { onErrorMock, user } = setupAnimeList();
      const reloadButton = await screen.findByRole('button', {
        name: /Back To List/i,
      });

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
