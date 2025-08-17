import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import logo from '@/assets/images/rss-logo.png';

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
          <Image width={128} height={46} className={styles.rsLogo} src={logo} alt="rss-logo" />
        </a>
      </div>
    </section>
  );
}
