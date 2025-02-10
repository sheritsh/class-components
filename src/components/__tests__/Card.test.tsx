import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';
import { mockAnime } from '../../__tests__/test-utils';

describe('Card Component', () => {
  it('renders card with anime data', () => {
    const onAnimeSelect = vi.fn();
    render(<Card anime={mockAnime} onAnimeSelect={onAnimeSelect} />);

    const heading = screen.getByRole('heading', { level: 3 });
    const image = screen.getByRole('img');

    expect(heading).toBeInTheDocument();
    expect(screen.getByText('Test synopsis...')).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.webp');
  });

  it('calls onAnimeSelect when clicked', () => {
    const onAnimeSelect = vi.fn();
    render(<Card anime={mockAnime} onAnimeSelect={onAnimeSelect} />);

    fireEvent.click(screen.getByRole('article'));
    expect(onAnimeSelect).toHaveBeenCalledWith(mockAnime);
  });

  it('shows "Описание отсутствует" when synopsis is missing', () => {
    const onAnimeSelect = vi.fn();
    const animeWithoutSynopsis = { ...mockAnime, synopsis: null };
    render(<Card anime={animeWithoutSynopsis} onAnimeSelect={onAnimeSelect} />);

    expect(screen.getByText('Описание отсутствует')).toBeInTheDocument();
  });
});
