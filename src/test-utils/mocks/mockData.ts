import type { Anime } from '@/models/animeModel';
import { baseAnimeListQuery } from '@/store/api/anime/config';
import type { getAnimeRandomValues } from '@/test-utils/generateMockData';

const mockLimit = baseAnimeListQuery.limit || 25;

export const mockPagination = {
  last_visible_page: 100 / mockLimit,
  has_next_page: true,
  current_page: 1,
  items: {
    count: mockLimit,
    total: 100,
    per_page: mockLimit,
  },
};

export const mockAnimeTitles = [
  '',
  'Attack on Titan',
  'Death Note',
  'Fullmetal Alchemist: Brotherhood',
  'Demon Slayer',
  'One Piece',
  'My Hero Academia',
  'Jujutsu Kaisen',
  'Steins;Gate',
  'Hunter x Hunter',
];

export const mockAnimeBaseData: Omit<Anime, keyof ReturnType<typeof getAnimeRandomValues>> = {
  url: 'https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood',
  images: {
    jpg: {
      image_url: 'https://cdn.myanimelist.net/images/anime/1208/94745.jpg',
      small_image_url: 'https://cdn.myanimelist.net/images/anime/1208/94745t.jpg',
      large_image_url: 'https://cdn.myanimelist.net/images/anime/1208/94745l.jpg',
    },
    webp: {
      image_url: 'https://cdn.myanimelist.net/images/anime/1208/94745.webp',
      small_image_url: 'https://cdn.myanimelist.net/images/anime/1208/94745t.webp',
      large_image_url: 'https://cdn.myanimelist.net/images/anime/1208/94745l.webp',
    },
  },
  trailer: {
    youtube_id: '1ac3_YdSSy0',
    url: 'https://www.youtube.com/watch?v=1ac3_YdSSy0',
    embed_url: 'https://www.youtube.com/embed/1ac3_YdSSy0?enablejsapi=1&wmode=opaque&autoplay=1',
    images: {
      image_url: 'https://img.youtube.com/vi/1ac3_YdSSy0/default.jpg',
      small_image_url: 'https://img.youtube.com/vi/1ac3_YdSSy0/sddefault.jpg',
      medium_image_url: 'https://img.youtube.com/vi/1ac3_YdSSy0/mqdefault.jpg',
      large_image_url: 'https://img.youtube.com/vi/1ac3_YdSSy0/hqdefault.jpg',
      maximum_image_url: 'https://img.youtube.com/vi/1ac3_YdSSy0/maxresdefault.jpg',
    },
  },
  approved: true,
  titles: [
    {
      type: 'Default',
      title: 'Fullmetal Alchemist: Brotherhood',
    },
    {
      type: 'Synonym',
      title: 'Hagane no Renkinjutsushi: Fullmetal Alchemist',
    },
    {
      type: 'Synonym',
      title: 'Fullmetal Alchemist (2009)',
    },
    {
      type: 'Synonym',
      title: 'FMA',
    },
    {
      type: 'Synonym',
      title: 'FMAB',
    },
    {
      type: 'English',
      title: 'Fullmetal Alchemist: Brotherhood',
    },
  ],
  title_japanese: 'FULLMETAL ALCHEMIST',
  title_synonyms: ['Hagane no Renkinjutsushi: Fullmetal Alchemist'],
  type: 'TV',
  source: 'Manga',
  episodes: 64,
  status: 'Finished Airing',
  airing: false,
  aired: {
    from: '2009-04-05T00:00:00+00:00',
    to: '2010-07-04T00:00:00+00:00',
    prop: {
      from: {
        day: 5,
        month: 4,
        year: 2009,
      },
      to: {
        day: 4,
        month: 7,
        year: 2010,
      },
    },
    string: 'Apr 5, 2009 to Jul 4, 2010',
  },
  duration: '24 min per ep',
  rating: 'r17',
  rank: 2,
  popularity: 3,
  members: 3547281,
  favorites: 234967,
  synopsis:
    'After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality. Ignoring the alchemical principle banning human transmutation, the boys attempted to bring their recently deceased mother back to life. Instead, they suffered brutal personal loss: Alphonse\'s body disintegrated while Edward lost a leg and then sacrificed an arm to keep Alphonse\'s soul in the physical realm by binding it to a hulking suit of armor.\n\nThe brothers are rescued by their neighbor Pinako Rockbell and her granddaughter Winry. Known as a bio-mechanical engineering prodigy, Winry creates prosthetic limbs for Edward by utilizing "automail," a tough, versatile metal used in robots and combat armor. After years of training, the Elric brothers set off on a quest to restore their bodies by locating the Philosopher\'s Stone\u2014a powerful gem that allows an alchemist to defy the traditional laws of Equivalent Exchange.\n\nAs Edward becomes an infamous alchemist and gains the nickname "Fullmetal," the boys\' journey embroils them in a growing conspiracy that threatens the fate of the world.\n\n[Written by MAL Rewrite]',
  background: '',
  season: 'spring',
  year: 2009,
  broadcast: {
    day: 'Sundays',
    time: '17:00',
    timezone: 'Asia/Tokyo',
    string: 'Sundays at 17:00 (JST)',
  },
  producers: [
    {
      mal_id: 17,
      type: 'anime',
      name: 'Aniplex',
      url: 'https://myanimelist.net/anime/producer/17/Aniplex',
    },
    {
      mal_id: 58,
      type: 'anime',
      name: 'Square Enix',
      url: 'https://myanimelist.net/anime/producer/58/Square_Enix',
    },
  ],
  licensors: [
    {
      mal_id: 102,
      type: 'anime',
      name: 'Funimation',
      url: 'https://myanimelist.net/anime/producer/102/Funimation',
    },
    {
      mal_id: 493,
      type: 'anime',
      name: 'Aniplex of America',
      url: 'https://myanimelist.net/anime/producer/493/Aniplex_of_America',
    },
  ],
  studios: [
    {
      mal_id: 4,
      type: 'anime',
      name: 'Bones',
      url: 'https://myanimelist.net/anime/producer/4/Bones',
    },
  ],
  genres: [
    {
      mal_id: 1,
      type: 'anime',
      name: 'Action',
      url: 'https://myanimelist.net/anime/genre/1/Action',
    },
    {
      mal_id: 2,
      type: 'anime',
      name: 'Adventure',
      url: 'https://myanimelist.net/anime/genre/2/Adventure',
    },
    {
      mal_id: 10,
      type: 'anime',
      name: 'Fantasy',
      url: 'https://myanimelist.net/anime/genre/10/Fantasy',
    },
  ],
  explicit_genres: [],
  themes: [
    {
      mal_id: 38,
      type: 'anime',
      name: 'Military',
      url: 'https://myanimelist.net/anime/genre/38/Military',
    },
  ],
  demographics: [
    {
      mal_id: 27,
      type: 'anime',
      name: 'Shounen',
      url: 'https://myanimelist.net/anime/genre/27/Shounen',
    },
  ],
} as const;
