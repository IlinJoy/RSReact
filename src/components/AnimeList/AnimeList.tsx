import clsx from 'clsx';
import { useLocation, useNavigate, useParams } from 'react-router';

import { AnimeListCard } from '@/components/AnimeListCard/AnimeListCard';
import { FallbackUi } from '@/components/FallbackUi/FallbackUi';
import { ListComponent } from '@/components/ListComponent/ListComponent';
import { NothingFound } from '@/components/NothingFound/NothingFound';
import { Pagination } from '@/components/Pagination/Pagination';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useGetAnimePaginatedListQuery } from '@/store/api/anime/animeApi';

import styles from './AnimeList.module.scss';

export function AnimeList() {
  const { setQueryParams, appQueryParams } = useQueryParams();
  const { search } = useLocation();
  const { detailsId } = useParams();
  const navigate = useNavigate();

  const {
    data: anime,
    isLoading,
    isFetching,
    isError,
  } = useGetAnimePaginatedListQuery(appQueryParams);

  const shouldShowPagination = !!anime?.data.length;
  const isOutletOpen = !!detailsId;

  const handleClickOnSection = () => isOutletOpen && navigate(`/${search}`);

  const handlePaginationChange = (direction: number) => {
    if (anime?.pagination) {
      const page = anime.pagination.current_page + direction;
      setQueryParams({ page });
    }
  };

  return isError ? (
    <FallbackUi />
  ) : (
    <div
      onClick={handleClickOnSection}
      className={clsx(styles.wrapper, {
        [styles.shrink]: isOutletOpen,
        [styles.disable]: isFetching,
      })}
    >
      <div className={styles.section}>
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
