import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { AnimeList } from '@/components/AnimeList/AnimeList';
import { FlyoutList } from '@/components/FlyoutList/FlyoutList';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useQueryParams } from '@/hooks/useQueryParams';
import { checkedItemsSelectors } from '@/store/slices/checkedItems/selectors';

import styles from './HomePage.module.scss';

export function HomePage() {
  const { getQueryParam } = useQueryParams();
  const [, setSearchTerm] = useLocalStorage('task-anime', '');
  const navigate = useNavigate();
  const urlQuery = getQueryParam('query') || '';
  const hasSelected = !!useSelector(checkedItemsSelectors.selectTotal);

  const handleSearchTermUpdate = (term: string) => {
    setSearchTerm(term);
    navigate(`/${term ? '?query=' + encodeURIComponent(term) : ''}`);
  };

  return (
    <>
      <SearchBar onSearch={handleSearchTermUpdate} searchTerm={urlQuery} />
      <section className={styles.cardsWrapper}>
        {hasSelected && <FlyoutList />}
        <AnimeList />
        <Outlet />
      </section>
    </>
  );
}
