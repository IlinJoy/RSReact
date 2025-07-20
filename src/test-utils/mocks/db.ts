import type { Anime } from '@/models/animeModel';
import type { PaginatedType } from '@/models/paginationModel';

import { withPagination } from '../generateMockData';

type Db = {
  anime: Anime[];
  paginatedAnimeList?: PaginatedType<Anime>;
};

export const db: Db = {
  anime: [],
};

export const initializeDb = (anime: Anime[]) => {
  db.anime = anime;
  db.paginatedAnimeList = withPagination(anime);
};
