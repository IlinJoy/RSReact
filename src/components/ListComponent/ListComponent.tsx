import { Component, type ReactNode } from 'react';

import { Spinner } from '../Spinner/Spinner';

type ListComponentProps<T> = {
  isLoading?: boolean;
  data: T[];
  renderItem: (item: T) => ReactNode;
};

export class ListComponent<T> extends Component<ListComponentProps<T>> {
  render() {
    const { isLoading, data, renderItem } = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    if (!data.length) {
      return <div>Nothing Found</div>;
    }

    return data.map((item) => renderItem(item));
  }
}
