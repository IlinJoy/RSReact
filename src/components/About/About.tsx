import { getTranslations } from 'next-intl/server';

import styles from './About.module.scss';

export async function About() {
  const t = await getTranslations('About');

  return (
    <section>
      <div className={styles.wrapper}>
        <h1>{t('title')}</h1>
        <span>{t('subtitle')}</span>
        <p>{t('description')}</p>
        <a className={styles.link} href="https://rs.school/courses/reactjs" target="blank">
          <img className={styles.rsLogo} src="/images/rss-logo.png" alt="rss-logo" />
        </a>
      </div>
    </section>
  );
}
