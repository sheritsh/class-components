import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import AnimeDetails from '../AnimeDetails';
import { mockAnime } from '../../__tests__/test-utils';
import { fetchAnimeDetails } from '../../api';

vi.mock('../../api', () => ({
  fetchAnimeDetails: vi.fn(),
}));

describe('AnimeDetails Component', () => {
  const mockOnClose = vi.fn();

  it('shows loading state initially', async () => {
    vi.mocked(fetchAnimeDetails).mockResolvedValue(mockAnime);

    render(<AnimeDetails animeId={1} onClose={mockOnClose} />);

    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/загрузка/i)).not.toBeInTheDocument();
    });
  });

  it('shows anime details after loading', async () => {
    vi.mocked(fetchAnimeDetails).mockResolvedValue(mockAnime);

    render(<AnimeDetails animeId={1} onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByText('Рейтинг:')).toBeInTheDocument();
      expect(screen.getByText('Эпизоды:')).toBeInTheDocument();
      expect(screen.getByText('Статус:')).toBeInTheDocument();
      expect(screen.getByText('Год:')).toBeInTheDocument();
    });
  });

  it('shows error state if fetch fails', async () => {
    const error = new Error('Failed to fetch');
    vi.mocked(fetchAnimeDetails).mockRejectedValue(error);

    render(<AnimeDetails animeId={1} onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });
});
