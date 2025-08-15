'use client';

import { use } from 'react';

import { Button } from '@/components/Button/Button';
import { ItemCheckbox } from '@/components/ItemCheckbox/ItemCheckbox';
import { NothingFound } from '@/components/NothingFound/NothingFound';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useQueryParams } from '@/hooks/useQueryParams';
import type { Anime, DataType } from '@/models/animeModel';
import { useCheckItem } from '@/store/hooks/useCheckItem';

import styles from './AnimeDetailsCard.module.scss';

type AnimeDetailsCardProps = {
  animePromise: Promise<DataType<Anime> | undefined>;
};

export function AnimeDetailsCard({ animePromise }: AnimeDetailsCardProps) {
  const anime = use(animePromise);
  const { isSelected, handleCheckItem } = useCheckItem(anime?.data.mal_id);
  const { setQueryParams } = useQueryParams();

  if (!anime || !anime.data) {
    return <NothingFound />;
  }

  const {
    title,
    title_english,
    title_japanese,
    genres,
    episodes,
    duration,
    year,
    images: { webp },
  } = anime.data;

  const handleClose = () => setQueryParams({ details: undefined });

  return (
    <>
      <div className={styles.topRow}>
        <div className={styles.buttonGroup}>
          <Button
            className={styles.closeBtn}
            aria-label="back to list"
            onClick={handleClose}
            icon={<SpriteIcon id="close" size={20} />}
          />
          <Button
            aria-label="Invalidate details"
            title="Invalidate"
            onClick={() => {}}
            className={styles.closeBtn}
            icon={<SpriteIcon id="reload" size={20} />}
          />
        </div>

        <ItemCheckbox
          isChecked={isSelected}
          onChange={() => handleCheckItem(anime.data, isSelected)}
          isLarge
        />
      </div>

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
    </>
  );
}
