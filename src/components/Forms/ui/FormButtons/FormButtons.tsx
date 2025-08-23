import { Button } from '@/components/Button/Button';

import styles from './FormButtons.module.scss';

type FormButtonsProps = { shouldDisable?: boolean };

export function FormButtons({ shouldDisable }: FormButtonsProps) {
  return (
    <div className={styles.formButtons}>
      <Button className={styles.reset} type="reset">
        Reset
      </Button>
      <Button type="submit" disabled={shouldDisable}>
        Submit
      </Button>
    </div>
  );
}
