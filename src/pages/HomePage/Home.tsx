'use client';

import { useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

import { FlyoutList } from '@/components/FlyoutList/FlyoutList';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { isClient } from '@/constants/common';
import { useQueryParams } from '@/hooks/useQueryParams';
import { checkedItemsSelectors } from '@/store/slices/checkedItems/selectors';
import { SEARCH_TERM_STORAGE_KEY, setToLocalStorage } from '@/utils/localStorageUtils';

import styles from './Home.module.scss';

export function Home({ children }: PropsWithChildren) {
  const { appQueryParams } = useQueryParams();
  const router = useRouter();
  const hasSelected = !!useSelector(checkedItemsSelectors.selectTotal);

  const handleSearchTermUpdate = (term: string) => {
    if (isClient) {
      setToLocalStorage(SEARCH_TERM_STORAGE_KEY, term);
      router.push(`/${term ? '?query=' + encodeURIComponent(term) : ''} `);
    }
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
