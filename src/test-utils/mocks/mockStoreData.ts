import type { CheckedItem } from '@store/types';

export const mockStoreItem: CheckedItem = {
  id: 1,
  title: 'title',
  title_japanese: 'title_japanese',
  genres: ['genre1', 'genre2'],
  episodes: 2,
  duration: '30',
  year: 2000,
  image: 'imageLink',
};

export const mockStoreItems = {
  ids: [1, 2],
  entities: { 1: mockStoreItem, 2: { ...mockStoreItem, id: 2 } },
};
