import clsx from 'clsx';
import { type InputHTMLAttributes, type ReactNode, type Ref } from 'react';

import { type UserFormData } from '@/validation/formSchema';

import styles from './Input.module.scss';

type InputProps<T extends Record<string, unknown>> = {
  name: keyof T;
  label?: string;
  ref?: Ref<HTMLInputElement>;
  error?: string;
  button?: ReactNode;
  strengthIndicator?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

export function FormInput<T extends Record<string, unknown> = UserFormData>({
  type = 'text',
  name,
  label,
  id,
  ref,
  required = true,
  error,
  button,
  strengthIndicator,
  ...rest
}: InputProps<T>) {
  const inputId = id ?? name;

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.horizontal]: type === 'radio' || type === 'checkbox',
      })}
    >
      {label && (
        <label htmlFor={inputId} className={clsx(styles.label, type === 'file' && styles.file)}>
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          {...rest}
          id={inputId}
          type={type}
          name={name}
          aria-required={required}
          className={styles.input}
          ref={ref}
        />

        {button}
        {strengthIndicator}
      </div>

      {error && (
        <p role="alert" aria-label={`error-${name}`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
