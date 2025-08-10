import { Button } from '@/components/Button/Button';
import { ItemCheckbox } from '@/components/ItemCheckbox/ItemCheckbox';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useGetAnimeDetails } from '@/hooks/useGetAnimeDetails';
import type { Anime } from '@/models/animeModel';
import { useCheckItem } from '@/store/hooks/useCheckItem';

import styles from './AnimeDetailsCard.module.scss';

type AnimeDetailsCardProps = {
  data: Anime;
  onClose: () => void;
};

export function AnimeDetailsCard({ data, onClose }: AnimeDetailsCardProps) {
  const { isSelected, handleCheckItem } = useCheckItem(data.mal_id);
  const { invalidate } = useGetAnimeDetails();

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
    <>
      <div className={styles.topRow}>
        <div className={styles.buttonGroup}>
          <Button
            className={styles.closeBtn}
            aria-label="back to list"
            onClick={onClose}
            icon={<SpriteIcon id="close" size={20} />}
          />
          <Button
            aria-label="Invalidate details"
            title="Invalidate"
            onClick={invalidate}
            className={styles.closeBtn}
            icon={<SpriteIcon id="reload" size={20} />}
          />
        </div>

        <ItemCheckbox
          isChecked={isSelected}
          onChange={() => handleCheckItem(data, isSelected)}
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
