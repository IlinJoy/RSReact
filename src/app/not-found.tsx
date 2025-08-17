/* eslint-disable react/jsx-no-literals */

import { Montserrat } from 'next/font/google';

import styles from './app.module.scss';

const montserrat = Montserrat({
  variable: '--font-secondary',
  subsets: ['latin'],
});

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <section className={styles.wrapper}>
          <h1>Global 404</h1>
          <div>non-localized</div>
        </section>
      </body>
    </html>
  );
}
