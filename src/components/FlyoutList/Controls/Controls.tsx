import clsx from 'clsx';
import { useRef } from 'react';

import { Button } from '@/components/Button/Button';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useDownload } from '@/hooks/useDownload';
import { useAppDispatch } from '@/store/hooks/base';
import { removeAll } from '@/store/slices/checkedItems/checkedItems';
import type { CheckedItem } from '@/store/types';
import { csvBaseOptions } from '@/utils/downloadUtils';

import styles from './Controls.module.scss';

export type ControlsProps = {
  CheckedItems: CheckedItem[];
  onListOpen: () => void;
  isModal?: boolean;
};

export function Controls({ CheckedItems, onListOpen, isModal }: ControlsProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const dispatch = useAppDispatch();

  const totalAmount = CheckedItems.length;
  const total = totalAmount >= 15 && !isModal ? '15+' : totalAmount;

  const { download } = useDownload<CheckedItem[]>({
    fileName: `${totalAmount}_items`,
    options: csvBaseOptions,
  });

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

      <div className={clsx(styles.buttonsColumn, { [styles.modal]: isModal })}>
        <Button
          size="small"
          onClick={() => download(CheckedItems, linkRef)}
          title="Download List"
          aria-label="Download List"
          icon={<SpriteIcon id="download" />}
        >
          <a ref={linkRef} data-testid="download-link" className={styles.linkButton} />
        </Button>

        <Button
          icon={<SpriteIcon id="remove" />}
          size="small"
          title="Remove All"
          aria-label="Remove All"
          onClick={() => dispatch(removeAll())}
        />
      </div>
    </div>
  );
}
