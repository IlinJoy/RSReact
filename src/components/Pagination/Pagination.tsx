import type { Pagination } from '@models/paginationModel';

import styles from './Pagination.module.scss';

type PaginationProps = {
  pagination: Pagination;
  onChange: (direction: number) => void;
};

export function Pagination({ pagination, onChange }: PaginationProps) {
  const { current_page, last_visible_page } = pagination;

  return (
    <div className={styles.pagination}>
      <button onClick={() => onChange(-1)} disabled={current_page === 1}>
        {'<'}
      </button>
      <span>{`${current_page} of ${last_visible_page}`}</span>
      <button onClick={() => onChange(1)} disabled={current_page === last_visible_page}>
        {'>'}
      </button>
    </div>
  );
}
