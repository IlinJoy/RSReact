/* eslint-disable react/jsx-no-literals */
'use client';
import '../styles/globals.scss';

import { Montserrat } from 'next/font/google';
import { useEffect } from 'react';

import { Button } from '@/components/Button/Button';

import styles from './app.module.scss';

const montserrat = Montserrat({
  variable: '--font-secondary',
  subsets: ['latin'],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <section className={styles.wrapper}>
          <h1>Something went wrong!</h1>
          <p>Global non-localized</p>
          <Button onClick={() => reset()}>Reset</Button>
        </section>
      </body>
    </html>
  );
}
