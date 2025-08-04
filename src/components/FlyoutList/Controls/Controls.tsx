import clsx from 'clsx';
import { type RefObject, useRef } from 'react';

import { Button } from '@/components/Button/Button';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useAppDispatch } from '@/store/hooks/base';
import { removeAll } from '@/store/slices/checkedItemsSlice';

import styles from './Controls.module.scss';

export type ControlsProps = {
  totalAmount: number;
  onDownload: (linkHref: RefObject<HTMLAnchorElement | null>) => void;
  onListOpen: () => void;
  isModal?: boolean;
};

export function Controls({ totalAmount, onListOpen, isModal, onDownload }: ControlsProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const dispatch = useAppDispatch();

  const total = totalAmount >= 15 && !isModal ? '15+' : totalAmount;

  return (
    <div className={clsx(styles.wrapper, { [styles.modal]: isModal })}>
      <div className={clsx(styles.buttonsColumn, { [styles.modal]: isModal })}>
        <span aria-label="Chosen items total amount">
          Total:
          <br /> {total}
        </span>
        {!isModal && (
          <Button
            size="small"
            title="Open List"
            aria-label="Open List"
            icon={<SpriteIcon id="list" />}
            onClick={onListOpen}
          />
        )}
      </div>

      <a
        ref={linkRef}
        onClick={() => onDownload(linkRef)}
        title="Download List"
        aria-label="Download List"
        className={styles.linkButton}
      >
        <SpriteIcon id="download" />
      </a>

      <Button
        icon={<SpriteIcon id="remove" />}
        size="small"
        title="Remove All"
        aria-label="Remove All"
        onClick={() => dispatch(removeAll())}
      />
    </div>
  );
}
