import { useLoaderData, useLocation, useNavigate } from 'react-router';

import { Button } from '@/components/Button/Button';
import { ItemCheckbox } from '@/components/ItemCheckbox/ItemCheckbox';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useCheckItem } from '@/hooks/useCheckItem';
import type { Anime, DataType } from '@/models/animeModel';

import styles from './AnimeDetails.module.scss';

export function AnimeDetails() {
  const { data } = useLoaderData<DataType<Anime>>();
  const { search } = useLocation();
  const navigate = useNavigate();

  const {
    mal_id,
    title,
    title_english,
    title_japanese,
    genres,
    episodes,
    duration,
    year,
    images: { webp },
  } = data;

  const { isSelected, handleCheckItem } = useCheckItem(mal_id);

  return (
    <div className={styles.details} aria-label="details">
      <div className={styles.topRow}>
        <Button
          className={styles.closeBtn}
          aria-label="back to list"
          onClick={() => navigate(`/${search}`)}
          icon={<SpriteIcon id="close" size={20} />}
        />
        <ItemCheckbox isChecked={isSelected} onChange={() => handleCheckItem(data)} isLarge />
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
    </div>
  );
}
