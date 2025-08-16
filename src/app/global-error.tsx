'use client';

import { FallbackUi } from '@/components/FallbackUi/FallbackUi';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <FallbackUi error={error} resetError={reset} />
      </body>
    </html>
  );
}
