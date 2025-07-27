import { type ReactNode } from 'react';

import { Spinner } from '@/components/Spinner/Spinner';

import styles from './ListComponent.module.scss';

type ListComponentProps<T> = {
  isLoading?: boolean;
  data?: T[];
  renderItem: (item: T) => ReactNode;
};

export function ListComponent<T>({ isLoading, data, renderItem }: ListComponentProps<T>) {
  if (isLoading || !data) {
    return <Spinner />;
  }

  if (!data?.length) {
    return <div>Nothing Found</div>;
  }

  return <div className={styles.wrapper}>{data?.map((item) => renderItem(item))}</div>;
}
