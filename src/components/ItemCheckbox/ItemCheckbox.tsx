import { SpriteIcon } from '@components/SpriteIcon/SpriteIcon';
import clsx from 'clsx';

import styles from './ItemCheckbox.module.scss';

type ItemCheckboxProps = {
  isChecked: boolean;
  onChange: (value: boolean) => void;
  isLarge?: boolean;
};

export function ItemCheckbox({ isChecked, onChange, isLarge }: ItemCheckboxProps) {
  return (
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(event) => onChange(event.target.checked)}
        className={styles.hidden}
      />
      <span
        className={clsx(styles.checkbox, { [styles.checked]: isChecked, [styles.large]: isLarge })}
      >
        <SpriteIcon id="heart" size={20} />
      </span>
    </div>
  );
}
