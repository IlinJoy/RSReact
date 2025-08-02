import clsx from 'clsx';

import { Button } from '@/components/Button/Button';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useAppDispatch } from '@/store/hooks';
import { removeAll } from '@/store/slices';

import styles from './Controls.module.scss';

type ControlsProps = {
  totalAmount: number;
  onListOpen: () => void;
  isModal?: boolean;
};

export function Controls({ totalAmount, onListOpen, isModal }: ControlsProps) {
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

      <Button
        size="small"
        icon={<SpriteIcon id="download" />}
        title="Download List"
        aria-label="Download List"
      />
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
