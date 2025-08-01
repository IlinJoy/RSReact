import { useNavigate } from 'react-router';

import { Button } from '@/components/Button/Button';

import styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className={styles.wrapper}>
      <h1>Page Not Found</h1>
      <div>The page you&apos;re looking for doesn&apos;t exist or has been moved.</div>

      <Button onClick={() => navigate(`/`)} text="Back to the main page"></Button>
    </section>
  );
}
