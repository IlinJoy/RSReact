import { fetchAnimeDetails } from '@/api/fetchAnimeDetails';
import { AnimeDetails } from '@/components/AnimeDetails/AnimeDetails';
import { AnimeList } from '@/components/AnimeList/AnimeList';

export type PageProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const query = await searchParams;

  if (query.details) {
    fetchAnimeDetails(query.details);
  }

  return (
    <AnimeList query={query}>{!!query.details && <AnimeDetails id={query.details} />}</AnimeList>
  );
}
