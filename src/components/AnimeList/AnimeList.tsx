import type { ReactNode } from 'react';

import { fetchAnimeList } from '@/api/fetchAnimeList';
import { AnimeListUI } from '@/components/AnimeList/ui/AnimeListUi';
import { AnimeListCard } from '@/components/AnimeListCard/AnimeListCard';
import { ListComponent } from '@/components/ListComponent/ListComponent';
import { NothingFound } from '@/components/NothingFound/NothingFound';
import { filterDuplicateResponseItemsById } from '@/utils/filterDuplicateResponseItemsById';

export type AnimeListProps = {
  query: { [key: string]: string };

  children?: ReactNode;
};

export async function AnimeList({ query, children = null }: AnimeListProps) {
  const rawData = await fetchAnimeList(query);
  const anime = rawData && filterDuplicateResponseItemsById(rawData.data);

  return (
    <>
      <AnimeListUI data={rawData} id={query.details}>
        <ListComponent
          data={anime}
          emptyView={<NothingFound />}
          renderItem={(data) => <AnimeListCard data={data} key={data.mal_id} />}
        />
      </AnimeListUI>
      {children}
    </>
  );
}
