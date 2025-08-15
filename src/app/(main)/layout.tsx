import type { ReactNode } from 'react';

import { AnimeList } from '@/components/AnimeList/AnimeList';
import { Home } from '@/pages/HomePage/Home';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Home>
      <AnimeList />
      {children}
    </Home>
  );
}
