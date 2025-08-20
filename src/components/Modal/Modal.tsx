import { type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/components/Button/Button';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';
import { useFocus } from '@/hooks/useFocus';
import { useOnEscapeKey } from '@/hooks/useOnEscapeKey';

import styles from './Modal.module.scss';

export type ModalContent = {
  title?: string;
  children: ReactNode;
};

type DialogProps = {
  rootContainer?: Element;
  onClose: () => void;
} & ModalContent;

export function Modal({ onClose, title, children, rootContainer }: DialogProps) {
  const modalRef = useFocus<HTMLDivElement>();

  useOnEscapeKey(onClose);

  const closeOnOutsideClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const renderContent = () => (
    <div
      onClick={closeOnOutsideClick}
      data-modal="true"
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      ref={modalRef}
    >
      <div className={styles.content}>
        <div className={styles.heading}>
          {title}
          <Button
            size="small"
            onClick={onClose}
            className={styles.closeButton}
            icon={<SpriteIcon id="close" />}
            aria-label="close"
          />
        </div>
        {children}
      </div>
    </div>
  );

  return createPortal(renderContent(), rootContainer || document.body);
}
