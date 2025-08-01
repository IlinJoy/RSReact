import { Link, useLocation } from 'react-router';

import { ItemCheckbox } from '@/components/ItemCheckbox/ItemCheckbox';
import { MESSAGES } from '@/constants/messages';
import type { Anime } from '@/models/animeModel';
import { ROUTES } from '@/router/routes';

import styles from './AnimeListCard.module.scss';

export const GENRES_AMOUNT_TO_RENDER = 2;

type AnimeListCardProps = {
  data: Anime;
};

export function AnimeListCard({ data }: AnimeListCardProps) {
  const { search } = useLocation();
  const {
    title,
    title_english,
    genres,
    score,
    scored_by,
    status,
    images: { webp },
  } = data;

  const extraGenresAmount = genres.length - GENRES_AMOUNT_TO_RENDER;
  const animeTitle = title_english || title;
  const scoredBy = scored_by ? `(${scored_by} votes)` : MESSAGES.NO_RATING;

  return (
    <article className={styles.cardWrapper}>
      <div className={styles.topRow}>
        <span className={styles.status}>{status}</span>
        <ItemCheckbox isChecked={false} onChange={() => {}} />
      </div>

      <Link to={`${ROUTES.DETAILS}/${data.mal_id}${search}`} className={styles.card}>
        <img className={styles.cover} src={webp.large_image_url} alt={`${title} cover`} />

        <div className={styles.description}>
          <h3 className={styles.animeTitle}>{animeTitle}</h3>

          <p className={styles.score}>
            {score}
            <span> {scoredBy}</span>
          </p>

          <ul className={styles.genresWrapper}>
            {genres.slice(0, GENRES_AMOUNT_TO_RENDER).map((genre) => (
              <li key={genre.mal_id}>{genre.name}</li>
            ))}
            {extraGenresAmount > 0 && <li className={styles.extra}>{'+' + extraGenresAmount}</li>}
          </ul>
        </div>
      </Link>
    </article>
  );
}
