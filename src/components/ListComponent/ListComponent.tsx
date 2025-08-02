import { type ReactNode } from 'react';

import { Spinner } from '@/components/Spinner/Spinner';

import styles from './ListComponent.module.scss';

type ListComponentProps<T> = {
  isLoading?: boolean;
  data?: T[];
  renderItem: (item: T) => ReactNode;
  emptyView?: ReactNode;
};

export function ListComponent<T>({
  isLoading,
  data,
  renderItem,
  emptyView,
}: ListComponentProps<T>) {
  if (isLoading || !data) {
    return <Spinner />;
  }

  if (!data?.length) {
    return emptyView;
  }

  return <div className={styles.wrapper}>{data?.map((item) => renderItem(item))}</div>;
}
