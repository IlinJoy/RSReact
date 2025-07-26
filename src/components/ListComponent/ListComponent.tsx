import { type ReactNode } from 'react';

import { Spinner } from '@/components/Spinner/Spinner';

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

  return data?.map((item) => renderItem(item));
}
