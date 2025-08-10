import { useNavigate, useRouteError } from 'react-router';

import { Button } from '@/components/Button/Button';
import { RESPONSE_CODES } from '@/constants/api';
import { NotFoundPage } from '@/router/lazyElements';
import { normalizeError } from '@/utils/normalizeError';

import styles from './FallbackUi.module.scss';

export type FallbackProps = {
  error?: unknown;
  resetError?: () => void;
  buttonMessage?: string;
};

export function FallbackUi({ error, resetError, buttonMessage = '' }: FallbackProps) {
  const routerError = useRouteError();
  const navigate = useNavigate();
  const currentError = normalizeError(error || routerError);

  const handleReset = () => {
    if (!resetError) {
      navigate('/');
      window.location.reload();
    } else {
      resetError();
    }
  };

  if (currentError.status === RESPONSE_CODES.NOT_FOUND) {
    return <NotFoundPage />;
  }

  return (
    <section className={styles.errorSection}>
      <div className={styles.wrapper}>
        <h1>Something went wrong.</h1>
        <p>{currentError.message}</p>
        <Button onClick={handleReset}>{buttonMessage || 'Reload Page'}</Button>
      </div>
    </section>
  );
}
