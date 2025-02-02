import { Anime } from './types';

export const fetchAnime = async (searchTerm: string): Promise<Anime[]> => {
  const url = searchTerm
    ? `https://api.jikan.moe/v4/anime?q=${searchTerm}&page=1`
    : `https://api.jikan.moe/v4/anime?page=1`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || [];
};
