import clsx from 'clsx';
import { type ChangeEvent, type ReactNode, useState } from 'react';

import { Button } from '@/components/Button/Button';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { getPasswordStrength } from '@/utils/getPasswordStrength';

import styles from './PasswordInput.module.scss';

type PasswordInputProps = {
  withIndicator?: boolean;
  renderInput: (props: {
    button: ReactNode;
    onInput: (e: ChangeEvent<HTMLInputElement>) => void;
    strengthIndicator?: ReactNode;
    type: 'password' | 'text';
  }) => ReactNode;
};

export function PasswordInput({ renderInput, withIndicator }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState<string>();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (withIndicator) {
      setStrength(getPasswordStrength(e.target.value));
    }
  };

  return (
    <>
      {renderInput({
        type: showPassword ? 'text' : 'password',
        onInput,
        button: (
          <Button
            type="button"
            size="small"
            onClick={togglePassword}
            icon={showPassword ? <SpriteIcon id="password" /> : <SpriteIcon id="password-off" />}
          />
        ),
        strengthIndicator: withIndicator && (
          <div
            aria-label="strength-indicator"
            className={clsx(styles.indicator, strength && styles[strength])}
          />
        ),
      })}
    </>
  );
}
