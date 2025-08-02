import type { Anime } from '@/models/animeModel';

export const mapAnime = (anime: Anime) => ({
  id: anime.mal_id,
  title: anime.title_english || anime.title,
  title_japanese: anime.title_japanese,
  genres: anime.genres.map((genre) => genre.name),
  episodes: anime.episodes,
  duration: anime.duration,
  year: anime.year,
  images: anime.images.webp.large_image_url,
});
