import { FC } from 'react';
import { Anime } from '../types';

interface CardProps {
  anime: Anime;
  onAnimeSelect: (anime: Anime) => void;
}

const Card: FC<CardProps> = ({ anime, onAnimeSelect }) => {
  return (
    <div
      role="article"
      onClick={() => onAnimeSelect(anime)}
      className="card hover:cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 p-4 bg-white shadow-md rounded-lg w-full flex"
    >
      <img
        src={anime.images?.webp?.image_url || ''}
        alt={anime.title}
        className="w-32 h-32 object-cover rounded-lg mr-4"
      />

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {anime.title}
        </h3>
        <p className="text-gray-600 text-sm hover:cursor-text">
          {anime.synopsis
            ? anime.synopsis.substring(0, 100) + '...'
            : 'Описание отсутствует'}
        </p>
      </div>
    </div>
  );
};

export default Card;
