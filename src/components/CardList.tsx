import { Component } from 'react';
import Card from './Card';
import { Anime } from '../types';

interface CardListProps {
  animeList: Anime[];
}

export default class CardList extends Component<CardListProps> {
  render() {
    return (
      <div>
        <div className="card-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-10 p-4">
          {this.props.animeList.map((anime) => (
            <Card key={anime.mal_id} anime={anime} />
          ))}
        </div>
        {this.props.animeList && this.props.animeList.length === 0 && (
          <div className="text-center">
            По указанному запросу ничего не нашлось
          </div>
        )}
      </div>
    );
  }
}
