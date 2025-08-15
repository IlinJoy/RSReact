import { useRouter } from 'next/router';

import { Button } from '@/components/Button/Button';

import styles from './NotFound.module.scss';

export function NotFoundPage() {
  const router = useRouter();

  return (
    <section className={styles.wrapper}>
      <h1>Page Not Found</h1>
      <div>The page you&apos;re looking for doesn&apos;t exist or has been moved.</div>

      <Button onClick={() => router.replace('/')}>Back to the main page</Button>
    </section>
  );
}
