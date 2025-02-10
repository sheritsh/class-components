import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from '../Loader';

describe('Loader Component', () => {
  it('displays loading text', () => {
    render(<Loader />);
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('renders spinner element', () => {
    render(<Loader />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });
});
