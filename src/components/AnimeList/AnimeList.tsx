'use client';

import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';

import { AnimeListCard } from '@/components/AnimeListCard/AnimeListCard';
import { FallbackUi } from '@/components/FallbackUi/FallbackUi';
import { ListComponent } from '@/components/ListComponent/ListComponent';
import { NothingFound } from '@/components/NothingFound/NothingFound';
import { Pagination } from '@/components/Pagination/Pagination';
import { Spinner } from '@/components/Spinner/Spinner';
import { useGetAnimeList } from '@/hooks/useGetAnimeList';
import { useQueryParams } from '@/hooks/useQueryParams';
import { getSearchString } from '@/utils/getSearchString';

import styles from './AnimeList.module.scss';

export function AnimeList() {
  const { setQueryParams } = useQueryParams();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { data: anime, isLoading, isFetching, error } = useGetAnimeList();

  const shouldShowPagination = !!anime?.data.length;
  const isOutletOpen = !!params?.id;

  const handleClickOnSection = () => isOutletOpen && router.push(`/${getSearchString()}`);

  const handlePaginationChange = (direction: number) => {
    if (anime?.pagination) {
      const page = anime.pagination.current_page + direction;
      setQueryParams({ page });
    }
  };

  if (error) {
    return <FallbackUi error={error} />;
  }

  return (
    <div
      onClick={handleClickOnSection}
      className={clsx(styles.wrapper, { [styles.shrink]: isOutletOpen })}
    >
      {isFetching && !isLoading && (
        <div className={styles.fixed}>
          <Spinner />
        </div>
      )}
      <div className={clsx(styles.section, { [styles.disable]: isFetching || isOutletOpen })}>
        <ListComponent
          isLoading={isLoading}
          data={anime?.data}
          emptyView={<NothingFound />}
          renderItem={(data) => <AnimeListCard data={data} key={data.mal_id} />}
        />
        {shouldShowPagination && (
          <Pagination onChange={handlePaginationChange} pagination={anime.pagination} />
        )}
      </div>
    </div>
  );
}
