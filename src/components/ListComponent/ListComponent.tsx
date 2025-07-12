import { Component, type ReactNode } from 'react';

type ListComponentProps<T> = {
  isLoading?: boolean;
  data: T[];
  renderItem: (item: T) => ReactNode;
};

class ListComponent<T> extends Component<ListComponentProps<T>> {
  render() {
    const { isLoading, data, renderItem } = this.props;

    if (isLoading) {
      return <div>Loading</div>;
    }

    if (!data.length) {
      return <div>Nothing Found</div>;
    }

    return data.map((item) => renderItem(item));
  }
}

export default ListComponent;
