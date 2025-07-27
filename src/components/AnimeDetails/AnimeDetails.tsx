import { useRef } from 'react';
import { useLoaderData, useNavigate } from 'react-router';

import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { Anime, DataType } from '@/models/animeModel';

import styles from './AnimeDetails.module.scss';

export function AnimeDetails() {
  const { data } = useLoaderData<DataType<Anime>>();
  const navigate = useNavigate();
  const detailsRef = useRef<HTMLDivElement>(null);

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

  const animeTitle = title_english || title;

  const backToList = () => {
    navigate(-1);
  };

  useClickOutside(detailsRef, backToList);

  return (
    <div className={styles.details} ref={detailsRef}>
      <button className={styles.closeBtn} aria-label="back to list" onClick={backToList}>
        <SpriteIcon id="close" size={20} />
      </button>
      <img className={styles.cover} src={webp.large_image_url} alt={`${title} cover`} />

      <div className={styles.description}>
        <div>
          <h3>{animeTitle}</h3>
          <p>{title_japanese}</p>
        </div>

        <ul className={styles.genresWrapper}>
          {genres.map((genre) => (
            <li key={genre.mal_id}>{genre.name}</li>
          ))}
        </ul>

        {Object.entries({ episodes, duration, year }).map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))}
      </div>
    </div>
  );
}
