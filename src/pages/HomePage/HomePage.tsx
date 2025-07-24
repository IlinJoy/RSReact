import { useState } from 'react';

import { AnimeList } from '@/components/AnimeList/AnimeList';
import { ErrorButton } from '@/components/ErrorButton/ErrorButton';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { storage } from '@/services/localStorage';

export type HomePageState = {
  searchTerm: string;
};

const getSearchTermFromStorage = () => storage.getData() || '';

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState(getSearchTermFromStorage);

  const handleUpdate = (searchTerm: string) => {
    storage.setData(searchTerm);
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <SearchBar onSearch={handleUpdate} searchTerm={searchTerm} />
      <AnimeList searchTerm={searchTerm} onError={handleUpdate} />
      <ErrorButton />
    </>
  );
}
