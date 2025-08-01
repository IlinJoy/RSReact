import clsx from 'clsx';
import { useState } from 'react';

import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';

import styles from './ItemCheckbox.module.scss';

type ItemCheckboxProps = {
  isChecked: boolean;
  onChange: (value: boolean) => void;
  isLarge?: boolean;
};

export function ItemCheckbox({ isChecked, onChange, isLarge }: ItemCheckboxProps) {
  const [checked, setChecked] = useState(isChecked);

  const handleChange = () => {
    setChecked((prev) => !prev);
    onChange(!checked);
  };

  return (
    <div className={styles.checkboxWrapper}>
      <input type="checkbox" checked={checked} onChange={handleChange} className={styles.hidden} />
      <span
        className={clsx(styles.checkbox, { [styles.checked]: checked, [styles.large]: isLarge })}
      >
        <SpriteIcon id="heart" size={20} />
      </span>
    </div>
  );
}
