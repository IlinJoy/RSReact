import styles from './FallbackUi.module.scss';

export type FallbackProps = {
  error: Error;
  resetError: () => void;
  buttonMessage?: string;
};

export function FallbackUi({ error, resetError, buttonMessage = '' }: FallbackProps) {
  return (
    <section className={styles.errorSection}>
      <div className={styles.wrapper}>
        <h1>Something went wrong.</h1>
        <p>{error.message}</p>
        <button onClick={resetError} className={styles.button}>
          {buttonMessage || 'Reload Page'}
        </button>
      </div>
    </section>
  );
}
