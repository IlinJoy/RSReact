'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/Button/Button';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useQueryParams } from '@/hooks/useQueryParams';

import styles from './NothingFound.module.scss';

export function NothingFound() {
  const [, setSavedTerm] = useLocalStorage('task-anime', '');
  const { resetQueryParams } = useQueryParams();
  const t = useTranslations('NotFound');

  const handleReset = () => {
    setSavedTerm('');
    resetQueryParams();
  };

  return (
    <section className={styles.nothingSection}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <Button onClick={handleReset} icon={<SpriteIcon id="reload" size={24} />}>
        {t('button')}
      </Button>
    </section>
  );
}
