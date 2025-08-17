'use client';

import { useTranslations } from 'next-intl';

import styles from './Spinner.module.scss';

export function Spinner() {
  const t = useTranslations('Spinner');

  return (
    <div className={styles.spinnerWrapper} role="status" aria-label="loading">
      <div className={styles.loading}>{`<${t('message')}`}</div>
    </div>
  );
}
