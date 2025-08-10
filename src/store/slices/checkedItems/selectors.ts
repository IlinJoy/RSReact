import { checkedItemsAdapter } from '@/store/slices/checkedItems/checkedItems';
import type { RootState } from '@/store/store';

export const checkedItemsSelectors = checkedItemsAdapter.getSelectors<RootState>(
  (state) => state.checkedItems
);

export const isItemCheckedSelector = (id: number) => (store: RootState) =>
  !!checkedItemsSelectors.selectById(store, id);
