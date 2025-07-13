import { Component, type ErrorInfo, type ReactNode } from 'react';

export type FallbackProps = { error: Error; resetError: () => void };

type ErrorBoundaryProps = {
  children: ReactNode;
  renderFallback: (props: FallbackProps) => ReactNode;
};

type ErrorBoundaryState = { error: Error | null };

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`Report: ${error.message}`, info);
  }

  resetError = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    const { renderFallback, children } = this.props;

    return error
      ? renderFallback({ error, resetError: this.resetError })
      : children;
  }
}

export default ErrorBoundary;
