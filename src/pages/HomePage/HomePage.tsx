import { Outlet, useNavigate } from 'react-router';

import { AnimeList } from '@/components/AnimeList/AnimeList';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import styles from './HomePage.module.scss';

export function HomePage() {
  const [searchTerm, setSearchTerm] = useLocalStorage('task-anime', '');
  const navigate = useNavigate();

  const handleSearchTermUpdate = (term: string) => {
    setSearchTerm(term);
    navigate(`/1${term ? '?q=' + encodeURIComponent(term) : ''}`);
  };

  return (
    <>
      <SearchBar onSearch={handleSearchTermUpdate} searchTerm={searchTerm} />
      <section className={styles.cardsWrapper}>
        <AnimeList />
        <Outlet />
      </section>
    </>
  );
}
