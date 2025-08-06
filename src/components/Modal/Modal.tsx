import { type MouseEvent, type ReactNode } from 'react';

import { Button } from '@/components/Button/Button';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';

import styles from './Modal.module.scss';

type DialogProps = {
  children: ReactNode;
  headingElement?: ReactNode;
  onClose: () => void;
};

export function Modal({ headingElement, onClose, children }: DialogProps) {
  const closeOnOutsideClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={closeOnOutsideClick} data-modal="true" className={styles.modal} role="dialog">
      <div className={styles.content}>
        <div className={styles.heading}>
          {headingElement}
          <Button
            onClick={() => onClose()}
            size="small"
            className={styles.closeButton}
            icon={<SpriteIcon id="close" />}
            aria-label="close"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
