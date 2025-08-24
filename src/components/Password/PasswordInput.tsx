import { type ReactNode, useState } from 'react';

import { Button } from '@/components/Button/Button';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';

type PasswordInputProps = {
  renderInput: (props: { button: ReactNode; type: 'password' | 'text' }) => ReactNode;
};

export function PasswordInput({ renderInput }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <>
      {renderInput({
        type: showPassword ? 'text' : 'password',
        button: (
          <Button
            type="button"
            size="small"
            onClick={togglePassword}
            icon={showPassword ? <SpriteIcon id="password" /> : <SpriteIcon id="password-off" />}
          />
        ),
      })}
    </>
  );
}
