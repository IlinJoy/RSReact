import { type RefObject, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Controls } from '@/components/FlyoutList/Controls/Controls';
import { ListItem } from '@/components/FlyoutList/ListItem/ListItem';
import { ListComponent } from '@/components/ListComponent/ListComponent';
import { Dialog } from '@/components/Modal/Dialog';
import { getItems } from '@/store/slices/checkedItemsSlice';
import { createDownloadUrl, generateCsvFromObjectArray } from '@/utils/createDownloadUrl';

export function FlyoutList() {
  const selectedItems = useSelector(getItems);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleDownload = (downloadLinkRef: RefObject<HTMLAnchorElement | null>) => {
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = createDownloadUrl(selectedItems, {
        type: 'text/csv',
        mapFunction: generateCsvFromObjectArray,
      });
      downloadLinkRef.current.download = `${selectedItems.length}_items`;
    }
  };

  const toggleDialog = () =>
    dialogRef.current?.open ? dialogRef.current.close() : dialogRef.current?.showModal();

  return (
    <>
      <Controls
        onDownload={handleDownload}
        totalAmount={selectedItems.length}
        onListOpen={toggleDialog}
      />
      <Dialog
        modalRef={dialogRef}
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
      </Dialog>
    </>
  );
}
