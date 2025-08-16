'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import { Pagination } from '@/components/Pagination/Pagination';
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
  const { setQueryParams } = useQueryParams();

  const shouldShowPagination = !!anime?.data.length;
  const isOutletOpen = !!id;

  const handleClickOnSection = () => isOutletOpen && setQueryParams({ details: undefined });

  const handlePaginationChange = (direction: number) => {
    if (anime?.pagination) {
      const page = anime.pagination.current_page + direction;
      setQueryParams({ page });
    }
  };

  return (
    <div
      onClick={handleClickOnSection}
      className={clsx(styles.wrapper, { [styles.shrink]: isOutletOpen })}
    >
      <div className={clsx(styles.section, { [styles.disable]: isOutletOpen })}>
        {children}

        {shouldShowPagination && (
          <Pagination onChange={handlePaginationChange} pagination={anime.pagination} />
        )}
      </div>
    </div>
  );
}
