import { Anime } from './types';

interface AnimeResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export const fetchAnime = async (
  searchTerm: string,
  page = 1
): Promise<AnimeResponse> => {
  const url = searchTerm
    ? `https://api.jikan.moe/v4/anime?q=${searchTerm}&page=${page}`
    : `https://api.jikan.moe/v4/anime?page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const fetchAnimeDetails = async (id: number): Promise<Anime> => {
  const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);

  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.data;
};
