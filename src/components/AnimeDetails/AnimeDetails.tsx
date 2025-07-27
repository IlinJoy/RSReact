import { useLoaderData, useLocation } from 'react-router';

import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useNavigateTo } from '@/hooks/useReturnToList';
import type { Anime, DataType } from '@/models/animeModel';

import styles from './AnimeDetails.module.scss';

export function AnimeDetails() {
  const { data } = useLoaderData<DataType<Anime>>();
  const { search } = useLocation();
  const navigateTo = useNavigateTo();

  const {
    title,
    title_english,
    title_japanese,
    genres,
    episodes,
    duration,
    year,
    images: { webp },
  } = data;

  return (
    <div className={styles.details} aria-label="details">
      <button
        className={styles.closeBtn}
        aria-label="back to list"
        onClick={() => navigateTo(search)}
      >
        <SpriteIcon id="close" size={20} />
      </button>
      <img className={styles.cover} src={webp.large_image_url} alt={`${title} detailed cover`} />

      <div className={styles.description}>
        <div>
          <h3>{title_english || title}</h3>
          <p>{title_japanese}</p>
        </div>

        <ul className={styles.genresWrapper}>
          {genres.map((genre) => (
            <li key={genre.mal_id}>{genre.name}</li>
          ))}
        </ul>

        {Object.entries({ episodes, duration, year })
          .filter(([, value]) => value !== null)
          .map(([key, value]) => (
            <p key={key}>
              {key}: {value}
            </p>
          ))}
      </div>
    </div>
  );
}
