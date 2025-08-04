import { type RefObject, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { Controls } from '@/components/FlyoutList/Controls/Controls';
import { ListItem } from '@/components/FlyoutList/ListItem/ListItem';
import { ListComponent } from '@/components/ListComponent/ListComponent';
import { Modal } from '@/components/Modal/Modal';
import { checkedItemsSelectors } from '@/store/slices/selectors';
import { createDownloadUrl, generateCsvFromObjectArray } from '@/utils/createDownloadUrl';

export function FlyoutList() {
  const [isShownModal, setIsShownModal] = useState(false);
  const selectedItems = useSelector(checkedItemsSelectors.selectAll);

  const handleDownload = (downloadLinkRef: RefObject<HTMLAnchorElement | null>) => {
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = createDownloadUrl(selectedItems, {
        type: 'text/csv',
        mapFunction: generateCsvFromObjectArray,
      });
      downloadLinkRef.current.download = `${selectedItems.length}_items`;
    }
  };

  const toggleDialog = useCallback(() => setIsShownModal((prev) => !prev), []);

  return (
    <>
      <Controls
        onDownload={handleDownload}
        totalAmount={selectedItems.length}
        onListOpen={toggleDialog}
      />
      {isShownModal && (
        <Modal
          onClose={toggleDialog}
          headingElement={
            <Controls
              isModal
              onDownload={handleDownload}
              totalAmount={selectedItems.length}
              onListOpen={toggleDialog}
            />
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
