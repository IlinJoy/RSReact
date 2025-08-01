import { Spinner } from '@/components/Spinner/Spinner';

import styles from './GlobalSpinner.module.scss';

export function GlobalSpinner() {
  return (
    <div className={styles.spinnerGlobal}>
      <Spinner />
    </div>
  );
}
