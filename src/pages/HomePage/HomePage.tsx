import { Outlet } from 'react-router';

import { AnimeList } from '@/components/AnimeList/AnimeList';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export type HomePageState = {
  searchTerm: string;
};

export function HomePage() {
  const [searchTerm, setSearchTerm] = useLocalStorage('task-anime', '');

  return (
    <>
      <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />
      <AnimeList searchTerm={searchTerm} onError={setSearchTerm} />
      <Outlet />
    </>
  );
}
