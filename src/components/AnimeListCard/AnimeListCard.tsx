import { Component } from 'react';

import { MESSAGES } from '@/constants/messages';
import type { Anime } from '@/models/animeModel';

import styles from './AnimeListCard.module.scss';

export const GENRES_AMOUNT_TO_RENDER = 2;

type AnimeListCardProps = {
  data: Anime;
};

export class AnimeListCard extends Component<AnimeListCardProps> {
  render() {
    const {
      title,
      title_english,
      genres,
      score,
      scored_by,
      status,
      images: { webp },
    } = this.props.data;

    const extraGenresAmount = genres.length - GENRES_AMOUNT_TO_RENDER;
    const animeTitle = title_english || title;
    const scoredBy = scored_by ? `(${scored_by} votes)` : MESSAGES.NO_RATING;

    return (
      <article className={styles.card}>
        <span className={styles.status}>{status}</span>
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
      </article>
    );
  }
}
