import { Component } from 'react';

import type { FallbackProps } from '../ErrorBoundary/ErrorBoundary';
import styles from './FallbackUi.module.scss';

class FallbackUi extends Component<FallbackProps> {
  render() {
    const { error, resetError } = this.props;
    return (
      <section className={styles.errorSection}>
        <div className={styles.wrapper}>
          <h1>Something went wrong.</h1>
          <p>{error.message}</p>
          <button onClick={resetError} className={styles.button}>
            Reload Page
          </button>
        </div>
      </section>
    );
  }
}

export default FallbackUi;
