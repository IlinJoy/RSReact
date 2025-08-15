'use client';

import Link from 'next/link';

import { ItemCheckbox } from '@/components/ItemCheckbox/ItemCheckbox';
import { MESSAGES } from '@/constants/messages';
import { useQueryParams } from '@/hooks/useQueryParams';
import type { Anime } from '@/models/animeModel';
import { useCheckItem } from '@/store/hooks/useCheckItem';

import styles from './AnimeListCard.module.scss';

export const GENRES_AMOUNT_TO_RENDER = 2;

type AnimeListCardProps = {
  data: Anime;
};

export function AnimeListCard({ data }: AnimeListCardProps) {
  const {
    mal_id,
    title,
    title_english,
    genres,
    score,
    scored_by,
    status,
    images: { webp },
  } = data;

  const { isSelected, handleCheckItem } = useCheckItem(mal_id);
  const { appQueryParams } = useQueryParams();
  const extraGenresAmount = genres.length - GENRES_AMOUNT_TO_RENDER;
  const animeTitle = title_english || title;
  const scoredBy = scored_by ? `(${scored_by} votes)` : MESSAGES.NO_RATING;

  return (
    <article className={styles.cardWrapper}>
      <div className={styles.topRow}>
        <span className={styles.status}>{status}</span>
        <ItemCheckbox isChecked={isSelected} onChange={() => handleCheckItem(data, isSelected)} />
      </div>

      <Link
        href={{ pathname: '/', query: { ...appQueryParams, details: mal_id } }}
        className={styles.card}
      >
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
