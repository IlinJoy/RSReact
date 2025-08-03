import clsx from 'clsx';

import { Button } from '@/components/Button/Button';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useAppDispatch } from '@/store/hooks';
import { removeAll } from '@/store/slices/checkedItemsSlice';

import styles from './Controls.module.scss';

type ControlsProps = {
  totalAmount: number;
  downloadUrl: string;
  onListOpen: () => void;
  isModal?: boolean;
};

export function Controls({ totalAmount, onListOpen, isModal, downloadUrl }: ControlsProps) {
  const dispatch = useAppDispatch();

  const total = totalAmount >= 15 && !isModal ? '15+' : totalAmount;

  return (
    <div className={clsx(styles.wrapper, { [styles.modal]: isModal })}>
      <div className={clsx(styles.buttonsColumn, { [styles.modal]: isModal })}>
        <span>
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
      <a href={downloadUrl} download={`${totalAmount}_items`}>
        <Button
          size="small"
          icon={<SpriteIcon id="download" />}
          title="Download List"
          aria-label="Download List"
        />
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
