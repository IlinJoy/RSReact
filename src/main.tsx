import './styles/index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { FallbackUi } from '@/components/FallbackUi/FallbackUi';
import { router } from '@/router/router';

const root = document.getElementById('root') as HTMLDivElement;
createRoot(root).render(
  <StrictMode>
    <ErrorBoundary
      renderFallback={({ error, resetError }) => (
        <FallbackUi error={error} resetError={resetError} />
      )}
    >
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
