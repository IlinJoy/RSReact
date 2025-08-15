import { Suspense } from 'react';

import { fetchAnimeDetails } from '@/api/fetchAnimeDetails';
import { AnimeDetailsCard } from '@/components/AnimeDetails/AnimeDetailsCard/AnimeDetailsCard';
import { Spinner } from '@/components/Spinner/Spinner';

import styles from './AnimeDetails.module.scss';

type AnimeDetailsProps = { id: string };

export async function AnimeDetails({ id }: AnimeDetailsProps) {
  const anime = fetchAnimeDetails(id);

  return (
    <div className={styles.details} aria-label="details">
      <Suspense fallback={<Spinner />}>{<AnimeDetailsCard animePromise={anime} />}</Suspense>
    </div>
  );
}
