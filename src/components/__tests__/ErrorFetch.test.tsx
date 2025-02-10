import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorFetch from '../ErrorFetch';

describe('ErrorFetch Component', () => {
  it('displays error message', () => {
    const errorMessage = 'Test error message';
    render(<ErrorFetch errorMessage={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('handles null error message', () => {
    render(<ErrorFetch errorMessage={null} />);
    const errorElement = screen.getByRole('alert');
    expect(errorElement).toBeInTheDocument();
  });
});
