import { Button } from '@/components/Button/Button';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useQueryParams } from '@/hooks/useQueryParams';

import styles from './NothingFound.module.scss';

export function NothingFound() {
  const [, setSavedTerm] = useLocalStorage('task-anime', '');
  const { resetQueryParams } = useQueryParams();

  const handleReset = () => {
    setSavedTerm('');
    resetQueryParams();
  };

  return (
    <section className={styles.nothingSection}>
      <h1>Nothing Found</h1>
      <p>Try searching for something else</p>
      <Button onClick={handleReset} icon={<SpriteIcon id="reload" size={24} />}>
        Reset Search
      </Button>
    </section>
  );
}
