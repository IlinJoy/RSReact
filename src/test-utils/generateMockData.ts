import type { Anime } from '@/models/animeModel';
import { mockAnimeBaseData, mockAnimeTitles, mockPagination } from '@/test-utils/mocks/mockData';
import { getRandomItemFromArray, getRandomNumber } from '@/test-utils/randomizers';

export const getAnimeRandomValues = () => {
  const title_english = getRandomItemFromArray(mockAnimeTitles);
  return {
    mal_id: getRandomNumber(),
    title: title_english || getRandomItemFromArray(mockAnimeTitles.filter(Boolean)),
    title_english,
    score: getRandomNumber(),
    scored_by: getRandomNumber(0, 1000),
  } as const;
};

export function generateMockData(animeOverrides?: Partial<Anime>) {
  return {
    ...mockAnimeBaseData,
    ...getAnimeRandomValues(),
    ...animeOverrides,
  };
}

export const withPagination = <T>(data: T[]) => {
  return { data, pagination: mockPagination };
};
