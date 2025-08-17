import '../../styles/globals.scss';

import { Funnel_Display, Montserrat } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, type Locale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { type ReactNode, Suspense } from 'react';

import { StoreProvider } from '@/app/StoreProvider';
import { Header } from '@/components/Header/Header';
import { Spinner } from '@/components/Spinner/Spinner';
import { LazyThemeContextProvider } from '@/context/theme/ThemeContext';
import { routing } from '@/i18n/routing';

const montserrat = Montserrat({
  variable: '--font-secondary',
  subsets: ['latin'],
});

const funnel = Funnel_Display({
  variable: '--font-primary',
  subsets: ['latin'],
});

type RootLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Omit<RootLayoutProps, 'children'>) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: 'RootLayout' });

  return {
    title: 'Jinkan List',
    description: t('description'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${montserrat.variable} ${funnel.variable}`}>
        <div id="root">
          <NextIntlClientProvider>
            <StoreProvider>
              <Suspense fallback={<Spinner />}>
                <LazyThemeContextProvider>
                  <Header />
                  {children}
                </LazyThemeContextProvider>
              </Suspense>
            </StoreProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
