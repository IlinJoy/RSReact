import clsx from 'clsx';
import { type InputHTMLAttributes, type Ref, useState } from 'react';

import { Button } from '@/components/Button/Button';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { type UserFormData } from '@/validation/formSchema';

import styles from './Input.module.scss';

type InputProps<T extends Record<string, unknown>> = {
  name: keyof T;
  label?: string;
  ref?: Ref<HTMLInputElement>;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

export function FormInput<T extends Record<string, unknown> = UserFormData>({
  type = 'text',
  name,
  label,
  id,
  ref,
  required = true,
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
          name={name}
          aria-required={required}
          className={styles.input}
          ref={ref}
        />
        {type === 'password' && (
          <Button
            type="button"
            size="small"
            onClick={togglePassword}
            icon={showPassword ? <SpriteIcon id="password" /> : <SpriteIcon id="password-off" />}
          />
        )}
      </div>

      {error && (
        <p role="alert" aria-label={`error-${name}`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
