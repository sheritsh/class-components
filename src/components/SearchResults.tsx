import { FC } from 'react';
import { Anime } from '../types';
import Card from './Card';

interface SearchResultsProps {
  animeList: Anime[];
  onAnimeSelect: (anime: Anime) => void;
}

const SearchResults: FC<SearchResultsProps> = ({
  animeList,
  onAnimeSelect,
}) => {
  if (animeList.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-8">
        По указанному запросу ничего не нашлось
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {animeList.map((anime, index) => (
        <Card
          key={`${anime.mal_id}-${index}`}
          anime={anime}
          onAnimeSelect={onAnimeSelect}
        />
      ))}
    </div>
  );
};

export default SearchResults;
