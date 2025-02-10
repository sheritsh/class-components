import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from '../ErrorButton';

describe('ErrorButton Component', () => {
  it('renders error button', () => {
    render(<ErrorButton />);
    expect(screen.getByText('Вызвать ошибку')).toBeInTheDocument();
  });

  it('throws error when clicked', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<ErrorButton />);

    const button = screen.getByText('Вызвать ошибку');
    expect(() => fireEvent.click(button)).toThrow('Ошибка в кнопке!');

    consoleSpy.mockRestore();
  });
});
