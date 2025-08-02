import { type DialogHTMLAttributes, type ReactNode, type RefObject, useEffect } from 'react';

import { Button } from '@/components/Button/Button';
import { SpriteIcon } from '@/components/SpriteIcon/SpriteIcon';

import styles from './Dialog.module.scss';

type DialogProps = {
  modalRef: RefObject<HTMLDialogElement | null>;
  children: ReactNode;
  headingElement?: ReactNode;
} & Omit<DialogHTMLAttributes<HTMLDialogElement>, 'ref'>;

export function Dialog({ modalRef, headingElement, children, ...rest }: DialogProps) {
  useEffect(() => {
    const dialog = modalRef.current;

    if (!dialog) {
      return;
    }

    const closeOnOutsideClick = (event: Event) => {
      const isClickedOnBackDrop = event.target === dialog;
      if (isClickedOnBackDrop) {
        dialog?.close();
      }
    };

    dialog?.addEventListener('click', closeOnOutsideClick);

    return () => dialog?.removeEventListener('click', closeOnOutsideClick);
  }, [modalRef]);

  return (
    <dialog ref={modalRef} className={styles.wrapper} {...rest}>
      <div className={styles.content}>
        <div className={styles.heading}>
          {headingElement}
          <Button
            onClick={() => modalRef.current?.close()}
            size="small"
            className={styles.closeButton}
            icon={<SpriteIcon id="close" />}
          />
        </div>
        {children}
      </div>
    </dialog>
  );
}
