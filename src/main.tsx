import './styles/index.scss';

import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { FallbackUi } from '@components/FallbackUi/FallbackUi';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/App';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary
      renderFallback={({ error, resetError }) => (
        <FallbackUi error={error} resetError={resetError} />
      )}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
