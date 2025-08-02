import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
  text?: string;
  className?: string;
  icon?: ReactNode;
  size?: 'small' | 'medium';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export function Button({ text, className = styles.baseButton, icon, size, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(styles.button, className, {
        [styles.medium]: size === 'medium',
        [styles.small]: size === 'small',
      })}
      {...props}
    >
      {text} {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}
