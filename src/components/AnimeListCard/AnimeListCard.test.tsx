import { render, screen } from '@testing-library/react';

import { MESSAGES } from '@/constants/messages';
import type { Anime } from '@/models/animeModel';
import { generateMockData } from '@/test-utils/generateMockData';

import { AnimeListCard, GENRES_AMOUNT_TO_RENDER } from './AnimeListCard';

const setupAnimeListCard = (props?: Partial<Anime>) => {
  const mockData = generateMockData(props);
  return {
    ...render(<AnimeListCard data={mockData} />),
    mockData,
  };
};

describe('AnimeListCard Component', () => {
  describe('Rendering', () => {
    it('should display item name and description correctly', () => {
      const {
        mockData: { status, title_english, genres, score, scored_by },
      } = setupAnimeListCard({
        title_english: 'Title',
        scored_by: 10,
        score: 9,
        genres: [
          { mal_id: 1, type: 'genre 1', name: 'genre 1', url: '' },
          { mal_id: 2, type: 'genre 2', name: 'genre 2', url: '' },
          { mal_id: 3, type: 'genre 3', name: 'genre 3', url: '' },
        ],
      });

      const currentGenresLength =
        genres.length > GENRES_AMOUNT_TO_RENDER
          ? GENRES_AMOUNT_TO_RENDER + 1
          : genres.length;
      const extraGenresAmount = genres.length - GENRES_AMOUNT_TO_RENDER;
      const genresItems = screen.getAllByRole('listitem');

      expect(screen.getByRole('heading')).toHaveTextContent(title_english);
      expect(screen.getByText(status)).toBeInTheDocument();

      expect(screen.getByText(String(score))).toBeInTheDocument();
      expect(screen.getByText(`(${scored_by} votes)`)).toBeInTheDocument();

      expect(genresItems).toHaveLength(currentGenresLength);
      expect(screen.getByText('genre 2')).toBeInTheDocument();
      expect(screen.queryByText('genre 3')).not.toBeInTheDocument();
      expect(genresItems[GENRES_AMOUNT_TO_RENDER]).toHaveTextContent(
        '+' + extraGenresAmount
      );
    });

    it('should display image cover correctly', () => {
      const {
        mockData: {
          title,
          images: { webp },
        },
      } = setupAnimeListCard();

      const image = screen.getByRole('img');

      expect(image).toHaveAttribute('src', webp.large_image_url);
      expect(image).toHaveAttribute('alt', `${title} cover`);
    });

    it('should handle missing props gracefully', () => {
      const {
        mockData: { title, score },
      } = setupAnimeListCard({
        scored_by: null,
        score: null,
        title_english: '',
        genres: [],
      });

      expect(screen.getByRole('heading')).toHaveTextContent(title);
      expect(screen.getByText(MESSAGES.NO_RATING)).toBeInTheDocument();

      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
      expect(screen.queryByText(String(score))).not.toBeInTheDocument();
    });
  });
});
