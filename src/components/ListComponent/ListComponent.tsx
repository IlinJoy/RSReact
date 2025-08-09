import { type ReactNode } from 'react';

import { Spinner } from '@/components/Spinner/Spinner';

import styles from './ListComponent.module.scss';

type ListComponentProps<T> = {
  isLoading?: boolean;
  data?: T[];
  renderItem: (item: T) => ReactNode;
  emptyView?: ReactNode;
  direction?: 'vertical' | 'horizontal';
};

export function ListComponent<T>({
  isLoading,
  data,
  renderItem,
  emptyView,
  direction = 'horizontal',
}: ListComponentProps<T>) {
  if (isLoading) {
    return <Spinner />;
  }

  if (!data?.length) {
    return emptyView;
  }

  return <div className={styles[direction]}>{data.map((item) => renderItem(item))}</div>;
}
