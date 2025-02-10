import { Component } from 'react';
import CardList from './CardList';
import { Anime } from '../types';

interface MainProps {
  animeList: Anime[];
}

export default class Main extends Component<MainProps> {
  render() {
    const { animeList } = this.props;
    return (
      <div className="">
        <CardList animeList={animeList} />
      </div>
    );
  }
}
