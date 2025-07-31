import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';

import { NotFoundPage } from '@/router/lazyElements';
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
  const currentError = error || routerError;

  const handleReset = () => {
    if (!resetError) {
      navigate('/');
      window.location.reload();
    } else {
      resetError();
    }
  };

  if (isRouteErrorResponse(currentError) && currentError.status === 404) {
    return <NotFoundPage />;
  }

  return (
    <section className={styles.errorSection}>
      <div className={styles.wrapper}>
        <h1>Something went wrong.</h1>
        <p>{getError(currentError).message}</p>
        <button onClick={handleReset} className={styles.button}>
          {buttonMessage || 'Reload Page'}
        </button>
      </div>
    </section>
  );
}
