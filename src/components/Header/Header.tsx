import clsx from 'clsx';
import { NavLink } from 'react-router';

import styles from './Header.module.scss';

const links = [
  { name: 'Home', path: '/1' },
  { name: 'About', path: '/about' },
];

export function Header() {
  return (
    <header>
      <nav className={styles.nav}>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
