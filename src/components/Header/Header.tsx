'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeSwitcher } from '@/components/Header/ThemeSwitcher/ThemeSwitcher';

import styles from './Header.module.scss';

const links = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

export function Header() {
  const pathname = usePathname();

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
