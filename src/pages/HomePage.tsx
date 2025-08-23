import { useState } from 'react';

import { Button } from '@/components/Button/Button';
import { UncontrolledForm } from '@/components/Forms/UncontrolledForm';
import { Modal, type ModalContent } from '@/components/Modal/Modal';

export function HomePage() {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  const handleClose = () => setModalContent(null);

  return (
    <div>
      <Button
        onClick={() =>
          setModalContent({
            title: 'Uncontrolled',
            children: <UncontrolledForm onSubmit={handleClose} />,
          })
        }
      >
        Open Uncontrolled
      </Button>
      <Button
        onClick={() => setModalContent({ title: 'Controlled', children: <p>Controlled form</p> })}
      >
        Open Controlled
      </Button>
      {!!modalContent && <Modal onClose={handleClose} {...modalContent} />}
    </div>
  );
}
