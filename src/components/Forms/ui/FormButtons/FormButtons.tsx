import { Button } from '@/components/Button/Button';

import styles from './FormButtons.module.scss';

type FormButtonsProps = { active?: boolean };

export function FormButtons({ active }: FormButtonsProps) {
  return (
    <div className={styles.formButtons}>
      <Button className={styles.reset} type="reset">
        Reset
      </Button>
      <Button type="submit" disabled={!active}>
        Submit
      </Button>
    </div>
  );
}
