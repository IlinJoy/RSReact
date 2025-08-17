import { notFound } from 'next/navigation';

import type { AppStringQueries } from '@/api/config';
import { fetchAnimeList } from '@/api/fetchAnimeList';
import { AnimeDetails } from '@/components/AnimeDetails/AnimeDetails';
import { AnimeListUI } from '@/components/AnimeList/ui/AnimeListUi';
import { AnimeListCard } from '@/components/AnimeListCard/AnimeListCard';
import { FallbackUi } from '@/components/FallbackUi/FallbackUi';
import { ListComponent } from '@/components/ListComponent/ListComponent';
import { NothingFound } from '@/components/NothingFound/NothingFound';
import { filterDuplicateResponseItemsById } from '@/utils/filterDuplicateResponseItemsById';
import { checkIsValidNumbersToQuery } from '@/utils/loadersUtils';

export type PageProps = {
  searchParams: Promise<AppStringQueries & { details?: string }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const query = await searchParams;

  checkIsValidNumbersToQuery([query.details, query.page]);

  const [error, rawData] = await fetchAnimeList(query);

  if (error) {
    return <FallbackUi error={error} />;
  }

  if (!rawData) {
    return notFound();
  }

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
      {query.details && <AnimeDetails id={query.details} />}
    </>
  );
}
