import clsx from 'clsx';
import { Outlet, useNavigate, useParams } from 'react-router';

import { AnimeList } from '@/components/AnimeList/AnimeList';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import styles from './HomePage.module.scss';

export function HomePage() {
  const [searchTerm, setSearchTerm] = useLocalStorage('task-anime', '');
  const navigate = useNavigate();
  const { detailsId } = useParams();

  const handleSearchTermUpdate = (term: string) => {
    setSearchTerm(term);
    navigate(`/1${term ? '?q=' + encodeURIComponent(term) : ''}`);
  };

  const isOutletOpen = !!detailsId;

  return (
    <>
      <SearchBar onSearch={handleSearchTermUpdate} searchTerm={searchTerm} />
      <section className={styles.cardsWrapper}>
        <div className={clsx(styles.section, { [styles.disable]: isOutletOpen })}>
          <AnimeList />
        </div>
        <Outlet />
      </section>
    </>
  );
}
