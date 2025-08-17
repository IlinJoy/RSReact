'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/Button/Button';
import { NotFound } from '@/components/NotFound/NotFound';
import { RESPONSE_CODES } from '@/constants/api';
import { normalizeError } from '@/utils/normalizeError';

import styles from './FallbackUi.module.scss';

export type FallbackProps = {
  error?: unknown;
  resetError?: () => void;
  buttonMessage?: string;
};

export function FallbackUi({ error, resetError, buttonMessage = '' }: FallbackProps) {
  const currentError = normalizeError(error);
  const t = useTranslations('FallbackUi');

  const handleReset = () => {
    if (!resetError) {
      window.location.reload();
    } else {
      resetError();
    }
  };

  if (currentError.status === RESPONSE_CODES.NOT_FOUND) {
    return <NotFound />;
  }

  return (
    <section className={styles.errorSection}>
      <div className={styles.wrapper}>
        <h1>{t('title')}</h1>
        <p>{currentError.message}</p>
        <Button onClick={handleReset}>{buttonMessage || t('button')}</Button>
      </div>
    </section>
  );
}
