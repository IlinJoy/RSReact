import { render, screen } from '@testing-library/react';
import type { MockInstance } from 'vitest';

import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { ERROR_MESSAGES } from '@/constants/messages';

const MockErrorComponent = () => {
  throw new Error(ERROR_MESSAGES.TEST);
};

const MockFallback = ({ error }: { error: Error }) => (
  <div>
    <h1>Something went wrong.</h1>
    <p>{error.message}</p>
    <button>Reload Page</button>
  </div>
);

const setupErrorBoundary = () => {
  return {
    ...render(
      <ErrorBoundary renderFallback={({ error }) => <MockFallback error={error} />}>
        <MockErrorComponent />
      </ErrorBoundary>
    ),
  };
};

describe('ErrorBoundary Component', () => {
  let errorSpy: MockInstance;
  beforeEach(() => (errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})));

  describe('Error Catching', () => {
    it('should catch and handles JavaScript errors in child components', () => {
      setupErrorBoundary();

      expect(errorSpy).toHaveBeenCalled();
      expect(screen.getByText(ERROR_MESSAGES.TEST)).toBeInTheDocument();
    });

    it('should display fallback UI when error occurs', () => {
      setupErrorBoundary();

      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reload Page' })).toBeInTheDocument();
    });

    it('should log error to console', () => {
      setupErrorBoundary();

      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(
        errorSpy.mock.calls
          .flat()
          .some((arg) => typeof arg === 'string' && arg.includes(ERROR_MESSAGES.TEST))
      ).toBe(true);
    });
  });
});
