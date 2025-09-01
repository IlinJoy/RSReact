import { type ChangeEvent, type ReactNode, useState } from 'react';

import styles from './FileInput.module.scss';

type FileInputProps = {
  renderInput: (props: {
    onInput: (e: ChangeEvent<HTMLInputElement>) => void;
    type: 'file';
  }) => ReactNode;
};

const NO_FILE_MESSAGE = 'No file chosen';

export function FileInput({ renderInput }: FileInputProps) {
  const [fileName, setFileName] = useState(NO_FILE_MESSAGE);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.files?.[0].name || NO_FILE_MESSAGE);
  };

  return (
    <div className={styles.wrapper}>
      {renderInput({ type: 'file', onInput: handleInput })}
      <div className={styles.fileName}>{fileName}</div>
    </div>
  );
}
