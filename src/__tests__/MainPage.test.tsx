import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import { mockAnime } from './test-utils';
import { fetchAnime } from '../api';

vi.mock('../api', () => ({
  fetchAnime: vi.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('MainPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetchAnime).mockResolvedValue({
      data: [mockAnime],
      pagination: {
        last_visible_page: 4,
        has_next_page: true,
        current_page: 1,
        items: {
          count: 25,
          total: 100,
          per_page: 25,
        },
      },
    });
  });

  it('renders initial state correctly', async () => {
    renderWithRouter(<MainPage />);

    expect(screen.getByPlaceholderText('Поиск...')).toBeInTheDocument();
    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });
  });

  it('handles search correctly', async () => {
    renderWithRouter(<MainPage />);

    const searchInput = screen.getByPlaceholderText('Поиск...');
    const searchButton = screen.getByText('Поиск');

    fireEvent.change(searchInput, { target: { value: 'test search' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });
  });

  it('handles pagination correctly', async () => {
    renderWithRouter(<MainPage />);

    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });

    const nextButton = screen.getByText('Вперед');
    fireEvent.click(nextButton);

    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });
  });

  it('handles anime selection correctly', async () => {
    renderWithRouter(<MainPage />);

    await waitFor(() => {
      const article = screen.getByRole('article');
      fireEvent.click(article);
    });

    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('handles error state correctly', async () => {
    const errorMessage = 'Test error';
    vi.mocked(fetchAnime).mockRejectedValueOnce(new Error(errorMessage));

    renderWithRouter(<MainPage />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
