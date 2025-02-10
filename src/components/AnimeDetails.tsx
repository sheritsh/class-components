import { FC, useState, useEffect } from 'react';
import { Anime } from '../types';
import { fetchAnimeDetails } from '../api';
import Loader from './Loader';
import ErrorFetch from './ErrorFetch';

interface AnimeDetailsProps {
  animeId: number;
  onClose: () => void;
}

const AnimeDetails: FC<AnimeDetailsProps> = ({ animeId, onClose }) => {
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnimeDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAnimeDetails(animeId);
        setAnime(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Произошла ошибка при загрузке данных'
        );
      } finally {
        setLoading(false);
      }
    };

    loadAnimeDetails();
  }, [animeId]);

  if (loading) return <Loader />;
  if (error) return <ErrorFetch errorMessage={error} />;
  if (!anime) return null;

  return (
    <div className="p-4 relative">
      <button
        role="button"
        aria-label="закрыть"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="flex flex-col items-center gap-4">
        <img
          src={anime.images?.webp?.image_url || ''}
          alt={anime.title}
          className="w-64 h-auto rounded-lg shadow-lg"
        />
        <h2 className="text-2xl font-bold text-gray-800">{anime.title}</h2>
        <p className="text-gray-600">{anime.synopsis}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">Рейтинг:</span>{' '}
            {anime.score || 'Нет данных'}
          </div>
          <div>
            <span className="font-semibold">Эпизоды:</span>{' '}
            {anime.episodes || 'Нет данных'}
          </div>
          <div>
            <span className="font-semibold">Статус:</span>{' '}
            {anime.status || 'Нет данных'}
          </div>
          <div>
            <span className="font-semibold">Год:</span>{' '}
            {anime.year || 'Нет данных'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
