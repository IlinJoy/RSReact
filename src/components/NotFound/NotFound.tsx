import Link from 'next/link';

import styles from './NotFound.module.scss';

export function NotFound() {
  return (
    <section className={styles.wrapper}>
      <h1>Page Not Found</h1>
      <div>The page you&apos;re looking for doesn&apos;t exist or has been moved.</div>

      <Link href="/" className={styles.linkButton}>
        Back to the main page
      </Link>
    </section>
  );
}
