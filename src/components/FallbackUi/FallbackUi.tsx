import { Component } from 'react';

import styles from './FallbackUi.module.scss';

export type FallbackProps = {
  error: Error;
  resetError: () => void;
  buttonMessage?: string;
};

class FallbackUi extends Component<FallbackProps> {
  render() {
    const { error, resetError, buttonMessage = '' } = this.props;
    return (
      <section className={styles.errorSection}>
        <div className={styles.wrapper}>
          <h1>Something went wrong.</h1>
          <p>{error.message}</p>
          <button onClick={resetError} className={styles.button}>
            {buttonMessage || 'Reload Page'}
          </button>
        </div>
      </section>
    );
  }
}

export default FallbackUi;
