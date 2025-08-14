import '../styles/globals.scss';

import type { Metadata } from 'next';
import { Funnel_Display, Montserrat } from 'next/font/google';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Jinkan List',
  description: 'Definitely not a best site to visit',
};

const montserrat = Montserrat({
  variable: '--font-secondary',
  subsets: ['latin'],
});

const funnel = Funnel_Display({
  variable: '--font-primary',
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${funnel.variable}`}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
