import { FC } from 'react';
import Card from './Card';
import { Anime } from '../types';

interface CardListProps {
  animeList: Anime[];
  onAnimeSelect: (anime: Anime) => void;
}

const CardList: FC<CardListProps> = ({ animeList, onAnimeSelect }) => {
  return (
    <div>
      <div className="card-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-10 p-4">
        {animeList.map((anime) => (
          <Card
            key={anime.mal_id}
            anime={anime}
            onAnimeSelect={onAnimeSelect}
          />
        ))}
      </div>
      {animeList && animeList.length === 0 && (
        <div className="text-center">
          По указанному запросу ничего не нашлось
        </div>
      )}
    </div>
  );
};

export default CardList;
