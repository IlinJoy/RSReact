import type { Anime } from '@models/animeModel';
import { addItem, removeItem } from '@slices/checkedItems/checkedItemsSlice';
import { isItemCheckedSelector } from '@slices/checkedItems/selectors';
import { useAppDispatch } from '@store/hooks/base';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

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
