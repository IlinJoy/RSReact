import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
  className?: string;
  icon?: ReactNode;
  size?: 'small' | 'medium' | 'large';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export function Button({
  className = styles.baseButton,
  icon,
  size = 'large',
  ...props
}: ButtonProps) {
  return (
    <button className={clsx(styles.button, className, styles[size])} {...props}>
      {props.children} {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}
