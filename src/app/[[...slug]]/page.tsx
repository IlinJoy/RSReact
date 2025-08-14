import { ClientOnly } from '@/app/[[...slug]]/client';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  return <ClientOnly />;
}
