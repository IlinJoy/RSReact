'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { ThemeSwitcher } from '@/components/Header/ThemeSwitcher/ThemeSwitcher';
import { Link, usePathname } from '@/i18n/navigation';

import styles from './Header.module.scss';

export function Header() {
  const pathname = usePathname();
  const t = useTranslations('Nav');

  const links = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={clsx(styles.navLink, { [styles.active]: pathname === link.path })}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <span className={styles.logo}>{`<///>`}</span>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
