import styles from './ErrorMessage.module.scss';

type ErrorMessageProps = { text?: string; name: string };

export function HelperText({ text, name }: ErrorMessageProps) {
  return (
    <p role={text && 'alert'} aria-label={`helperText-${name}`} className={styles.error}>
      {text && text}
    </p>
  );
}
