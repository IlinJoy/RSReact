'use client';

import { type PropsWithChildren, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { FlyoutList } from '@/components/FlyoutList/FlyoutList';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useQueryParams } from '@/hooks/useQueryParams';
import { checkedItemsSelectors } from '@/store/slices/checkedItems/selectors';

import styles from './Home.module.scss';

export function Home({ children }: PropsWithChildren) {
  const { appQueryParams, setQueryParams } = useQueryParams();
  const [term, saveTerm] = useLocalStorage('task-anime', '');
  const hasSelected = !!useSelector(checkedItemsSelectors.selectTotal);
  const isFirstMount = useRef(true);

  const handleSearchTermUpdate = (term: string) => {
    saveTerm(term);
    setQueryParams({ details: undefined, page: undefined, query: term });
  };

  useEffect(() => {
    if (isFirstMount.current && appQueryParams.query !== term) {
      setQueryParams({ details: undefined, page: undefined, query: term });
      isFirstMount.current = false;
    }
  }, [setQueryParams, term, appQueryParams.query]);

  return (
    <>
      <SearchBar searchTerm={appQueryParams.query || term} onSearch={handleSearchTermUpdate} />
      <section className={styles.cardsWrapper}>
        {hasSelected && <FlyoutList />}
        {children}
      </section>
    </>
  );
}
