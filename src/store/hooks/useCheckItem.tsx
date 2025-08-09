import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import type { Anime } from '@/models/animeModel';
import { useAppDispatch } from '@/store/hooks/base';
import { addItem, removeItem } from '@/store/slices/checkedItems/checkedItems';
import { isItemCheckedSelector } from '@/store/slices/checkedItems/selectors';

export function useCheckItem(id: number) {
  const dispatch = useAppDispatch();
  const selectedItem = useSelector(isItemCheckedSelector(id));

  const handleCheckItem = useCallback(
    (data: Anime, isSelected: boolean) => {
      if (!isSelected) {
        dispatch(addItem(data));
      } else {
        dispatch(removeItem(data.mal_id));
      }
    },
    [dispatch]
  );

  return { isSelected: !!selectedItem, handleCheckItem };
}
