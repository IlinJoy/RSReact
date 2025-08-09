import { useLocation, useNavigate } from 'react-router';

import { Button } from '@/components/Button/Button';
import { ItemCheckbox } from '@/components/ItemCheckbox/ItemCheckbox';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import type { Anime } from '@/models/animeModel';
import { useCheckItem } from '@/store/hooks/useCheckItem';

import styles from './AnimeDetailsCard.module.scss';

type AnimeDetailsCardProps = {
  data: Anime;
};

export function AnimeDetailsCard({ data }: AnimeDetailsCardProps) {
  const { isSelected, handleCheckItem } = useCheckItem(data?.mal_id);

  const { search } = useLocation();
  const navigate = useNavigate();

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
        <Button
          className={styles.closeBtn}
          aria-label="back to list"
          onClick={() => navigate(`/${search}`)}
          icon={<SpriteIcon id="close" size={20} />}
        />
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
