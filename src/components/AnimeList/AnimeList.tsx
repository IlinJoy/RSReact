import clsx from 'clsx';
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router';

import { AnimeListCard } from '@/components/AnimeListCard/AnimeListCard';
import { ListComponent } from '@/components/ListComponent/ListComponent';
import { Pagination } from '@/components/Pagination/Pagination';
import { useQueryParams } from '@/hooks/useQueryParams';
import type { Anime } from '@/models/animeModel';
import type { PaginatedType } from '@/models/paginationModel';
import { filterDuplicateResponseItemsById } from '@/utils/filterDuplicateResponseItemsById';

import styles from './AnimeList.module.scss';

export function AnimeList() {
  const paginatedAnime = useLoaderData<PaginatedType<Anime>>();
  const { setQueryParams } = useQueryParams();
  const { search } = useLocation();
  const { detailsId } = useParams();
  const navigate = useNavigate();

  const handlePaginationChange = (direction: number) => {
    const page = paginatedAnime.pagination.current_page + direction;
    setQueryParams({ page });
  };

  const shouldShowPagination = !!paginatedAnime.data.length;
  const filteredList = filterDuplicateResponseItemsById(paginatedAnime.data);
  const isOutletOpen = !!detailsId;

  const handleClickOnSection = () => {
    if (isOutletOpen) {
      navigate(`/${search}`);
    }
  };

  return (
    <div
      onClick={handleClickOnSection}
      className={clsx(styles.wrapper, { [styles.disable]: isOutletOpen })}
    >
      <div className={clsx(styles.section, { [styles.disable]: isOutletOpen })}>
        <ListComponent
          data={filteredList}
          renderItem={(data) => <AnimeListCard data={data} key={data.mal_id} />}
        />
        {shouldShowPagination && (
          <Pagination onChange={handlePaginationChange} pagination={paginatedAnime.pagination} />
        )}
      </div>
    </div>
  );
}
