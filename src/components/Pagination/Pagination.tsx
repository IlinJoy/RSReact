import type { PaginationType } from '@models/paginationModel';

import { Button } from '@/components/Button/Button';

import styles from './Pagination.module.scss';

export type PaginationProps = {
  pagination: PaginationType;
  onChange: (direction: number) => void;
};

export function Pagination({ pagination, onChange }: PaginationProps) {
  const { current_page, last_visible_page } = pagination;

  return (
    <div className={styles.pagination}>
      <Button
        text={'<'}
        onClick={() => onChange(-1)}
        disabled={current_page === 1}
        aria-label="back"
        isSmall
      />
      <span>{`${current_page} of ${last_visible_page}`}</span>
      <Button
        text={'>'}
        onClick={() => onChange(1)}
        disabled={current_page === last_visible_page}
        aria-label="forward"
        isSmall
      />
    </div>
  );
}
