'use client';

import { useRouter } from 'next/navigation';

import { AnimeDetailsCard } from '@/components/AnimeDetails/AnimeDetailsCard/AnimeDetailsCard';
import { FallbackUi } from '@/components/FallbackUi/FallbackUi';
import { NothingFound } from '@/components/NothingFound/NothingFound';
import { Spinner } from '@/components/Spinner/Spinner';
import { useGetAnimeDetails } from '@/hooks/useGetAnimeDetails';
import { getSearchString } from '@/utils/getSearchString';

import styles from './AnimeDetails.module.scss';

export function AnimeDetails() {
  const router = useRouter();

  const { data, error, isFetching } = useGetAnimeDetails();

  const handleClose = () => {
    router.push(`/${getSearchString()}`);
  };

  return (
    <div className={styles.details} aria-label="details">
      {isFetching ? (
        <Spinner />
      ) : error ? (
        <FallbackUi error={error} buttonMessage="Close" resetError={handleClose} />
      ) : !data ? (
        <NothingFound />
      ) : (
        <AnimeDetailsCard data={data} onClose={handleClose} />
      )}
    </div>
  );
}
