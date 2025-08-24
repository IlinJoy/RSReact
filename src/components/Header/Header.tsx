import { useState } from 'react';

import { Button } from '@/components/Button/Button';
import { ControlledForm } from '@/components/Forms/ControlledForm';
import { UncontrolledForm } from '@/components/Forms/UncontrolledForm';
import { Modal, type ModalContent } from '@/components/Modal/Modal';
import { type InfoOutput, useInfoOutputActions } from '@/store/infoOutputStore';

import styles from './Header.module.scss';

export function Header() {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const { setNewInfo } = useInfoOutputActions();

  const handleClose = () => setModalContent(null);

  const handleSubmit = (data: InfoOutput) => {
    setNewInfo(data);
    handleClose();
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Button
          onClick={() =>
            setModalContent({
              title: 'Uncontrolled',
              children: <UncontrolledForm onSubmit={handleSubmit} />,
            })
          }
        >
          Open Uncontrolled
        </Button>
        <Button
          onClick={() =>
            setModalContent({
              title: 'Controlled',
              children: <ControlledForm onSubmit={handleSubmit} />,
            })
          }
        >
          Open Controlled
        </Button>
        {!!modalContent && <Modal onClose={handleClose} {...modalContent} />}
      </div>
    </header>
  );
}
