import type { PaginationType } from '@models/paginationModel';

import styles from './Pagination.module.scss';

export type PaginationProps = {
  pagination: PaginationType;
  onChange: (direction: number) => void;
};

export function Pagination({ pagination, onChange }: PaginationProps) {
  const { current_page, last_visible_page } = pagination;

  return (
    <div className={styles.pagination}>
      <button onClick={() => onChange(-1)} disabled={current_page === 1} aria-label="back">
        {'<'}
      </button>
      <span>{`${current_page} of ${last_visible_page}`}</span>
      <button
        onClick={() => onChange(1)}
        disabled={current_page === last_visible_page}
        aria-label="forward"
      >
        {'>'}
      </button>
    </div>
  );
}
