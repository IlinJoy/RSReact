interface Pagination {
  last_visible_page: number;
  has_next_page: true;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export type PaginatedType<T> = { data: T[] } & Pagination;
