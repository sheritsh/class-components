import { FC, ReactNode } from 'react';
import CardList from './CardList';
import { Anime } from '../types';

interface MainProps {
  children?: ReactNode;
  animeList: Anime[];
  onAnimeSelect: (anime: Anime) => void;
}

const Main: FC<MainProps> = ({ children, animeList, onAnimeSelect }) => {
  return (
    <main role="main" className="flex-grow container mx-auto px-4 py-8">
      {children}
      <CardList animeList={animeList} onAnimeSelect={onAnimeSelect} />
    </main>
  );
};

export default Main;
