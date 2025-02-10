import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchResults from '../SearchResults';
import { mockAnime } from '../../__tests__/test-utils';

describe('SearchResults Component', () => {
  it('renders list of anime cards', () => {
    const animeList = [mockAnime, { ...mockAnime, mal_id: 2 }];
    render(<SearchResults animeList={animeList} onAnimeSelect={() => {}} />);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(2);
  });

  it('displays empty message when no results', () => {
    render(<SearchResults animeList={[]} onAnimeSelect={() => {}} />);
    expect(
      screen.getByText('По указанному запросу ничего не нашлось')
    ).toBeInTheDocument();
  });

  it('passes correct props to Card components', () => {
    const onAnimeSelect = vi.fn();
    render(
      <SearchResults animeList={[mockAnime]} onAnimeSelect={onAnimeSelect} />
    );

    expect(screen.getByText('Test synopsis...')).toBeInTheDocument();
  });
});
