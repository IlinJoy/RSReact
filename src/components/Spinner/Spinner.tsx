import { Component } from 'react';

import styles from './Spinner.module.scss';

export class Spinner extends Component {
  render() {
    return (
      <div className={styles.spinnerWrapper}>
        <div className={styles.loading}>{`<Loading `}</div>
      </div>
    );
  }
}
