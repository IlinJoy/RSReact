import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/Button/Button';
import { ListComponent } from '@/components/ListComponent/ListComponent';
import { Dialog } from '@/components/Modal/Dialog';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useAppDispatch } from '@/store/hooks';
import { getItems, removeAll } from '@/store/slices';

import styles from './FlyoutList.module.scss';

export function FlyoutList() {
  const selectedItems = useSelector(getItems);
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const total = selectedItems.length >= 15 ? '15+' : selectedItems.length;

  const toggleDialog = () =>
    dialogRef.current?.open ? dialogRef.current.close() : dialogRef.current?.showModal();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.buttonsColumn}>
          <span>
            Total:
            <br /> {total}
          </span>
          <Button
            className={styles.button}
            size="small"
            icon={<SpriteIcon id="list" />}
            onClick={toggleDialog}
          />
        </div>

        <Button className={styles.button} size="small" icon={<SpriteIcon id="download" />} />
        <Button
          className={styles.button}
          icon={<SpriteIcon id="remove" />}
          size="small"
          onClick={() => dispatch(removeAll())}
        />
      </div>
      <Dialog modalRef={dialogRef}>
        <ListComponent
          data={selectedItems}
          direction="vertical"
          renderItem={(data) => <div key={data.id}>{data.title}</div>}
        />
      </Dialog>
    </>
  );
}
