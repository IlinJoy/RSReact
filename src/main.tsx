import './styles/index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import FallbackUi from './components/FallbackUi/FallbackUi.tsx';

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
