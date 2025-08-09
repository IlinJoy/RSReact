import { useLocation, useNavigate } from 'react-router';

import { AnimeDetailsCard } from '@/components/AnimeDetails/AnimeDetailsCard/AnimeDetailsCard';
import { FallbackUi } from '@/components/FallbackUi/FallbackUi';
import { NothingFound } from '@/components/NothingFound/NothingFound';
import { Spinner } from '@/components/Spinner/Spinner';
import { useGetAnimeDetails } from '@/hooks/useGetAnimeDetails';

import styles from './AnimeDetails.module.scss';

export function AnimeDetails() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { data, error, isFetching } = useGetAnimeDetails();

  const handleClose = () => navigate(`/${search}`);

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
