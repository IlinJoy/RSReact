import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

import styles from './NotFound.module.scss';

export async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <section className={styles.wrapper}>
      <h1>{t('title')}</h1>
      <div>{t('description')}</div>

      <Link href="/" className={styles.linkButton}>
        {t('button')}
      </Link>
    </section>
  );
}
