import { useLoaderData } from 'react-router';

import { AnimeListCard } from '@/components/AnimeListCard/AnimeListCard';
import { ListComponent } from '@/components/ListComponent/ListComponent';
import type { Anime } from '@/models/animeModel';
import type { PaginatedType } from '@/models/paginationModel';

export function AnimeList() {
  const paginatedAnime = useLoaderData<PaginatedType<Anime>>();

  return (
    <ListComponent
      data={paginatedAnime.data}
      renderItem={(data) => <AnimeListCard data={data} key={data.mal_id} />}
    />
  );
}
