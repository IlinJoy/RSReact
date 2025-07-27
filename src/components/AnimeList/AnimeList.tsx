import { useLoaderData, useLocation, useNavigate } from 'react-router';

import { AnimeListCard } from '@/components/AnimeListCard/AnimeListCard';
import { ListComponent } from '@/components/ListComponent/ListComponent';
import { Pagination } from '@/components/Pagination/Pagination';
import type { Anime } from '@/models/animeModel';
import type { PaginatedType } from '@/models/paginationModel';
import { filterDuplicateResponseItemsById } from '@/utils/filterDuplicateResponseItemsById';

export function AnimeList() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const paginatedAnime = useLoaderData<PaginatedType<Anime>>();

  const handlePaginationChange = (direction: number) => {
    const page = paginatedAnime.pagination.current_page;
    navigate(`/${page + direction}${search}`);
  };

  const shouldShowPagination = !!paginatedAnime.data.length;
  const filteredList = filterDuplicateResponseItemsById(paginatedAnime.data);

  return (
    <>
      <ListComponent
        data={filteredList}
        renderItem={(data) => <AnimeListCard data={data} key={data.mal_id} />}
      />
      {shouldShowPagination && (
        <Pagination onChange={handlePaginationChange} pagination={paginatedAnime.pagination} />
      )}
    </>
  );
}
