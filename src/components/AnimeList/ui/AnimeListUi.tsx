'use client';

import clsx from 'clsx';
import { type ReactNode, useTransition } from 'react';

import { Pagination } from '@/components/Pagination/Pagination';
import { Spinner } from '@/components/Spinner/Spinner';
import { useQueryParams } from '@/hooks/useQueryParams';
import type { Anime } from '@/models/animeModel';
import type { PaginatedType } from '@/models/paginationModel';

import styles from './AnimeListUi.module.scss';

type AnimeListUIProps = {
  id?: string;
  children: ReactNode;
  data?: PaginatedType<Anime>;
};

export function AnimeListUI({ id, children, data: anime }: AnimeListUIProps) {
  const [isPending, startTransition] = useTransition();
  const { setQueryParams } = useQueryParams();

  const shouldShowPagination = !!anime?.data.length;
  const isOutletOpen = !!id;

  const handleClickOnSection = () => isOutletOpen && setQueryParams({ details: undefined });

  const handlePaginationChange = (direction: number) => {
    if (anime?.pagination) {
      startTransition(async () => {
        const page = anime.pagination.current_page + direction;
        setQueryParams({ page });
      });
    }
  };

  return (
    <div
      onClick={handleClickOnSection}
      className={clsx(styles.wrapper, { [styles.shrink]: isOutletOpen })}
    >
      {isPending && (
        <div className={styles.fixed}>
          <Spinner />
        </div>
      )}
      <div className={clsx(styles.section, { [styles.disable]: isOutletOpen || isPending })}>
        {children}

        {shouldShowPagination && (
          <Pagination onChange={handlePaginationChange} pagination={anime.pagination} />
        )}
      </div>
    </div>
  );
}
