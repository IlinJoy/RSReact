import { useNavigate } from 'react-router';

import styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className={styles.wrapper}>
      <h1>Page Not Found</h1>
      <div>The page you&apos;re looking for doesn&apos;t exist or has been moved.</div>

      <button onClick={() => navigate(`/`)}>Back to the main page</button>
    </section>
  );
}
