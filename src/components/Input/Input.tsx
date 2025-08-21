import clsx from 'clsx';
import { type InputHTMLAttributes, useState } from 'react';

import { Button } from '@/components/Button/Button';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import type { UserFormData } from '@/constants/types';

import styles from './Input.module.scss';

type InputProps<T extends Record<string, unknown>> = {
  type?: 'text' | 'password' | 'email' | 'radio' | 'checkbox';
  name: keyof T;
  id?: string;
  label?: string;
  placeholder?: string;
  ariaLabel?: string;
  isDisabled?: boolean;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

function Input<T extends Record<string, unknown>>({
  type = 'text',
  name,
  label,
  placeholder,
  isDisabled,
  id,
  required = true,
  ariaLabel,
  error,
  ...rest
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const inputId = id ?? name;

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.horizontal]: type === 'radio' || type === 'checkbox',
      })}
    >
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          {...rest}
          id={inputId}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          disabled={isDisabled}
          aria-label={ariaLabel}
          name={name}
          aria-required={required}
          className={styles.input}
        />
        {type === 'password' && (
          <Button
            size="small"
            onClick={togglePassword}
            icon={showPassword ? <SpriteIcon id="password" /> : <SpriteIcon id="password-off" />}
          />
        )}
      </div>

      {!!error && (
        <p role="alert" aria-label={`error-${name}`}>
          {error}
        </p>
      )}
    </div>
  );
}

export const FormInput = (props: InputProps<UserFormData>) => <Input {...props} />;
