import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { Controls } from '@/components/FlyoutList/Controls/Controls';
import { ListItem } from '@/components/FlyoutList/ListItem/ListItem';
import { ListComponent } from '@/components/ListComponent/ListComponent';
import { Modal } from '@/components/Modal/Modal';
import { checkedItemsSelectors } from '@/store/slices/checkedItems/selectors';

export function FlyoutList() {
  const [isShownModal, setIsShownModal] = useState(false);
  const selectedItems = useSelector(checkedItemsSelectors.selectAll);

  const toggleDialog = useCallback(() => setIsShownModal((prev) => !prev), []);

  return (
    <>
      <Controls CheckedItems={selectedItems} onListOpen={toggleDialog} />

      {isShownModal && (
        <Modal
          onClose={toggleDialog}
          headingElement={
            <Controls isModal CheckedItems={selectedItems} onListOpen={toggleDialog} />
          }
        >
          <ListComponent
            data={selectedItems}
            direction="vertical"
            renderItem={(data) => <ListItem key={data.id} data={data} />}
          />
        </Modal>
      )}
    </>
  );
}
