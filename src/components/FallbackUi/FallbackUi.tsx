import { useNavigate, useRouteError } from 'react-router';

import { getError } from '@/utils/handleErrorMessage';

import styles from './FallbackUi.module.scss';

export type FallbackProps = {
  error?: Error;
  resetError?: () => void;
  buttonMessage?: string;
};

export function FallbackUi({ error, resetError, buttonMessage = '' }: FallbackProps) {
  const routerError = useRouteError();
  const navigate = useNavigate();
  const errMessage = error?.message || getError(routerError).message;

  const handleReset = () => {
    if (!resetError) {
      navigate(-1);
      window.location.reload();
    } else {
      resetError();
    }
  };

  return (
    <section className={styles.errorSection}>
      <div className={styles.wrapper}>
        <h1>Something went wrong.</h1>
        <p>{errMessage}</p>
        <button onClick={handleReset} className={styles.button}>
          {buttonMessage || 'Reload Page'}
        </button>
      </div>
    </section>
  );
}
