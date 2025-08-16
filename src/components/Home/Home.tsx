'use client';

import { type PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FlyoutList } from '@/components/FlyoutList/FlyoutList';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useQueryParams } from '@/hooks/useQueryParams';
import { checkedItemsSelectors } from '@/store/slices/checkedItems/selectors';

import styles from './Home.module.scss';

export function Home({ children }: PropsWithChildren) {
  const { appQueryParams, setQueryParams } = useQueryParams();
  const [savedTerm, saveTerm] = useLocalStorage('task-anime', '');
  const hasSelected = !!useSelector(checkedItemsSelectors.selectTotal);

  useEffect(() => {
    if (savedTerm && !appQueryParams.query) {
      setQueryParams({ query: savedTerm });
    }
  }, [appQueryParams.query, savedTerm, setQueryParams]);

  const handleSearchTermUpdate = (term: string) => {
    saveTerm(term);
    setQueryParams({ details: undefined, page: undefined, query: term });
  };

  return (
    <>
      <SearchBar searchTerm={appQueryParams.query || ''} onSearch={handleSearchTermUpdate} />
      <section className={styles.cardsWrapper}>
        {hasSelected && <FlyoutList />}
        {children}
      </section>
    </>
  );
}
