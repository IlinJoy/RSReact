import { useCallback } from 'react';

import { animeApi } from '@/api/animeApi';
import { AnimeListCard } from '@/components/AnimeListCard/AnimeListCard';
import { FallbackUi } from '@/components/FallbackUi/FallbackUi';
import { ListComponent } from '@/components/ListComponent/ListComponent';
import { useFetcher } from '@/hooks/useFetch';

import styles from './AnimeList.module.scss';

export type AnimeListProps = {
  searchTerm: string;
  onError: (term: string) => void;
};

export function AnimeList({ searchTerm, onError }: AnimeListProps) {
  const fetchAnimeList = useCallback(
    (signal?: AbortSignal) => animeApi.getAnimeList({ q: searchTerm, page: 1 }, { signal }),
    [searchTerm]
  );

  const { isLoading, data: paginatedAnime, error } = useFetcher({ callback: fetchAnimeList });

  const handleFetchError = () => {
    onError('');
    window.location.reload();
  };

  return (
    <section className={styles.section}>
      {error ? (
        <FallbackUi error={error} resetError={handleFetchError} buttonMessage="Back To List" />
      ) : (
        <ListComponent
          isLoading={isLoading}
          data={paginatedAnime?.data}
          renderItem={(data) => <AnimeListCard data={data} key={data.mal_id} />}
        />
      )}
    </section>
  );
}
