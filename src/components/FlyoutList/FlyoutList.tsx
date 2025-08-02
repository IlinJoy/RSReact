import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { Controls } from '@/components/FlyoutList/Controls/Controls';
import { ListItem } from '@/components/FlyoutList/ListItem/ListItem';
import { ListComponent } from '@/components/ListComponent/ListComponent';
import { Dialog } from '@/components/Modal/Dialog';
import { getItems } from '@/store/slices';

export function FlyoutList() {
  const selectedItems = useSelector(getItems);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const toggleDialog = () =>
    dialogRef.current?.open ? dialogRef.current.close() : dialogRef.current?.showModal();

  console.log(selectedItems);
  return (
    <>
      <Controls totalAmount={selectedItems.length} onListOpen={toggleDialog} />
      <Dialog
        modalRef={dialogRef}
        headingElement={
          <Controls isModal totalAmount={selectedItems.length} onListOpen={toggleDialog} />
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
