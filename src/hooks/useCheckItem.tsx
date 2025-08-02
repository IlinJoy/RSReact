import { useCallback, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import type { Anime } from '@/models/animeModel';
import { useAppDispatch } from '@/store/hooks';
import { addItem, getItems, removeItem } from '@/store/slices';

export function useCheckItem(id: number) {
  const selectedItems = useSelector(getItems, shallowEqual);
  const dispatch = useAppDispatch();

  const isSelected = useMemo(
    () => selectedItems.some((item) => item.id === id),
    [id, selectedItems]
  );

  const handleCheckItem = useCallback(
    (data: Anime) => {
      if (!isSelected) {
        dispatch(addItem(data));
      } else {
        dispatch(removeItem(data.mal_id));
      }
    },
    [dispatch, isSelected]
  );

  return { isSelected, handleCheckItem };
}
