import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
  text?: string;
  className?: string;
  icon?: ReactNode;
  isSmall?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export function Button({
  text,
  className = styles.baseButton,
  icon,
  isSmall,
  ...props
}: ButtonProps) {
  return (
    <button className={clsx(styles.button, className, { [styles.small]: isSmall })} {...props}>
      {text} {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}
