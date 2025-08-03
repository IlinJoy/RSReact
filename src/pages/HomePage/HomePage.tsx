import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { AnimeList } from '@/components/AnimeList/AnimeList';
import { FlyoutList } from '@/components/FlyoutList/FlyoutList';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useQueryParams } from '@/hooks/useQueryParams';
import { getItems } from '@/store/slices/checkedItemsSlice';

import styles from './HomePage.module.scss';

export function HomePage() {
  const { getQueryParam } = useQueryParams();
  const [, setSearchTerm] = useLocalStorage('task-anime', '');
  const navigate = useNavigate();
  const urlQuery = getQueryParam('query') || '';
  const hasSelected = !!useSelector(getItems).length;

  const handleSearchTermUpdate = (term: string) => {
    setSearchTerm(term);
    navigate(`/${term ? '?query=' + encodeURIComponent(term) : ''}`);
  };

  return (
    <>
      <SearchBar onSearch={handleSearchTermUpdate} searchTerm={urlQuery} />
      <section className={styles.cardsWrapper}>
        <AnimeList />
        <Outlet />
        {hasSelected && <FlyoutList />}
      </section>
    </>
  );
}
