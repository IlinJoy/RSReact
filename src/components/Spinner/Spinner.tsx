import styles from './Spinner.module.scss';

export function Spinner() {
  return (
    <div className={styles.spinnerWrapper} role="status" aria-label="loading">
      <div className={styles.loading}>{`<Loading `}</div>
    </div>
  );
}
