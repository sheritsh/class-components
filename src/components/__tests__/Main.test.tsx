import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Main from '../Main';
import { mockAnime } from '../../__tests__/test-utils';

vi.mock('../CardList', () => ({
  default: () => <div data-testid="card-list">Mocked CardList</div>,
}));

describe('Main Component', () => {
  const mockProps = {
    animeList: [mockAnime],
    onAnimeSelect: () => {},
  };

  it('renders children correctly', () => {
    render(
      <Main {...mockProps}>
        <div className="OMG" data-testid="test-content">
          Test Content
        </div>
      </Main>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toHaveTextContent(
      'Test Content'
    );
  });

  it('applies correct classes', () => {
    render(
      <Main {...mockProps}>
        <div>Test Content</div>
      </Main>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass(
      'flex-grow',
      'container',
      'mx-auto',
      'px-4',
      'py-8'
    );
  });

  it('renders CardList component', () => {
    render(
      <Main {...mockProps}>
        <div>Test Content</div>
      </Main>
    );

    expect(screen.getByTestId('card-list')).toBeInTheDocument();
  });
});
