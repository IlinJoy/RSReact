import { skipToken } from '@reduxjs/toolkit/query/react';
import { useNavigate, useParams } from 'react-router';

import { AnimeDetailsCard } from '@/components/AnimeDetails/AnimeDetailsCard/AnimeDetailsCard';
import { FallbackUi } from '@/components/FallbackUi/FallbackUi';
import { Spinner } from '@/components/Spinner/Spinner';
import { useGetAnimeDetailsQuery } from '@/store/api/anime/animeApi';

import styles from './AnimeDetails.module.scss';

export function AnimeDetails() {
  const { detailsId } = useParams();
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetAnimeDetailsQuery(detailsId ?? skipToken);

  return (
    <div className={styles.details} aria-label="details">
      {isFetching && <Spinner />}
      {error && (
        <FallbackUi
          error={error}
          buttonMessage="To the main Page"
          resetError={() => navigate('/')}
        />
      )}
      {data && <AnimeDetailsCard data={data} />}
    </div>
  );
}
