import { type ReactNode } from 'react';

import { Home } from '@/components/Home/Home';

export default function MainLayout({ children }: { children: ReactNode }) {
  return <Home>{children}</Home>;
}
