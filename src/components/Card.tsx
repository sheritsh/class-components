import { Component } from 'react';
import { Anime } from '../types';

interface CardProps {
  anime: Anime;
}

export default class Card extends Component<CardProps> {
  render() {
    const { anime } = this.props;
    return (
      <div className="card hover:cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 p-4 bg-white shadow-md rounded-lg  w-full flex">
        <img
          src={anime.images?.webp ? (anime.images?.webp.image_url ?? '') : ''}
          alt={anime.titles ? anime.titles[0].title : ''}
          className="w-32 h-32 object-cover rounded-lg mr-4"
        />
        {/* </div> */}

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {anime.titles ? anime.titles[0].title : ''}
          </h3>
          <p className="text-gray-600 text-sm hover:cursor-text">
            {anime.synopsis
              ? anime.synopsis.substring(0, 100) + '...'
              : 'Описание отсутствует'}
          </p>
        </div>
      </div>
    );
  }
}
