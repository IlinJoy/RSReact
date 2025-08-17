import clsx from 'clsx';
import { useLocale } from 'next-intl';

import { useQueryParams } from '@/hooks/useQueryParams';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

import styles from './LocaleSwitcher.module.scss';

export function LocaleSwitcher() {
  const pathname = usePathname();
  const { appQueryParams } = useQueryParams();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleChange = (locale: (typeof routing.locales)[number]) => {
    router.replace({ pathname, query: appQueryParams }, { locale });
  };

  return (
    <div className={styles.wrapper}>
      <span>{'</'}</span>
      {routing.locales.map((locale, index) => (
        <span key={locale}>
          <div
            onClick={() => handleChange(locale)}
            className={clsx(styles.locale, { [styles.active]: locale === currentLocale })}
          >
            {locale}
          </div>
          {index < routing.locales.length - 1 && <span className={styles.divider}>/</span>}
        </span>
      ))}
      <span>{'/>'}</span>
    </div>
  );
}
