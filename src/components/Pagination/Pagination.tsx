import { Button } from '@components/Button/Button';
import { useTheme } from '@context/theme/ThemeContext';
import type { PaginationType } from '@models/paginationModel';
import clsx from 'clsx';

import styles from './Pagination.module.scss';

export type PaginationProps = {
  pagination: PaginationType;
  onChange: (direction: number) => void;
};

export function Pagination({ pagination, onChange }: PaginationProps) {
  const { theme } = useTheme();
  const { current_page, last_visible_page } = pagination;

  return (
    <div className={styles.pagination}>
      <Button
        text={'<'}
        className={clsx(styles.paginationBtn, { [styles.light]: theme === 'light' })}
        onClick={() => onChange(-1)}
        disabled={current_page === 1}
        aria-label="back"
        size="medium"
      />
      <span>{`${current_page} of ${last_visible_page}`}</span>
      <Button
        text={'>'}
        className={clsx(styles.paginationBtn, { [styles.light]: theme === 'light' })}
        onClick={() => onChange(1)}
        disabled={current_page === last_visible_page}
        aria-label="forward"
        size="medium"
      />
    </div>
  );
}
