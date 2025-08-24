import { Button } from '@/components/Button/Button';

import styles from './FormButtons.module.scss';

type FormButtonsProps = { disabled?: boolean };

export function FormButtons({ disabled }: FormButtonsProps) {
  return (
    <div className={styles.formButtons}>
      <Button className={styles.reset} type="reset">
        Reset
      </Button>
      <Button type="submit" disabled={disabled}>
        Submit
      </Button>
    </div>
  );
}
