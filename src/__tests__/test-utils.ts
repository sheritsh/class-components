import { components } from '../types/api';

type AnimeType = components['schemas']['anime'];

export const mockAnime: AnimeType = {
  mal_id: 1,
  url: 'https://test.com',
  images: {
    jpg: {
      image_url: 'test-image.jpg',
      small_image_url: 'test-image-small.jpg',
      large_image_url: 'test-image-large.jpg',
    },
    webp: {
      image_url: 'test-image.webp',
      small_image_url: 'test-image-small.webp',
      large_image_url: 'test-image-large.webp',
    },
  },
  titles: [
    {
      type: 'Default',
      title: 'Test Anime',
    },
  ],
  type: 'TV',
  source: 'Manga',
  episodes: 12,
  status: 'Finished Airing',
  airing: false,
  synopsis: 'Test synopsis',
  background: null,
  season: 'winter',
  year: 2023,
  broadcast: {
    day: 'monday',
    time: '00:00',
    timezone: 'Asia/Tokyo',
    string: 'Mondays at 00:00 (JST)',
  },
  producers: [],
  licensors: [],
  studios: [],
  genres: [],
  themes: [],
  demographics: [],
  score: 8.5,
  scored_by: 1000,
  rank: 100,
  popularity: 200,
  members: 10000,
  favorites: 1000,
  rating: 'PG-13 - Teens 13 or older',
  approved: true,
};
