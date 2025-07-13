import { Component } from 'react';

import { ERROR_MESSAGES } from '@/constants/messages';

import styles from './ErrorButton.module.scss';

type ErrorButtonState = {
  shouldThrow: boolean;
};

export class ErrorButton extends Component {
  state: ErrorButtonState = {
    shouldThrow: false,
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error(ERROR_MESSAGES.TEST);
    }

    return (
      <button
        className={styles.errorButton}
        onClick={() => {
          this.setState({ shouldThrow: true });
        }}
      >
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
