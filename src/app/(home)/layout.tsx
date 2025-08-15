import { type ReactNode } from 'react';

import { Home } from '@/pages/HomePage/Home';

export default function MainLayout({ children }: { children: ReactNode }) {
  return <Home>{children}</Home>;
}
