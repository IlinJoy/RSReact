import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { AnimeList } from '@/components/AnimeList/AnimeList';
import { FlyoutList } from '@/components/FlyoutList/FlyoutList';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useQueryParams } from '@/hooks/useQueryParams';
import { checkedItemsSelectors } from '@/store/slices/checkedItems/selectors';
import { SEARCH_TERM_STORAGE_KEY, setToLocalStorage } from '@/utils/localStorageUtils';

import styles from './HomePage.module.scss';

export function HomePage() {
  const { appQueryParams } = useQueryParams();
  const navigate = useNavigate();
  const hasSelected = !!useSelector(checkedItemsSelectors.selectTotal);

  const handleSearchTermUpdate = (term: string) => {
    setToLocalStorage(SEARCH_TERM_STORAGE_KEY, term);
    navigate(`/${term ? '?query=' + encodeURIComponent(term) : ''}`);
  };

  return (
    <>
      <SearchBar searchTerm={appQueryParams.query ?? ''} onSearch={handleSearchTermUpdate} />
      <section className={styles.cardsWrapper}>
        {hasSelected && <FlyoutList />}
        <AnimeList />
        <Outlet />
      </section>
    </>
  );
}
