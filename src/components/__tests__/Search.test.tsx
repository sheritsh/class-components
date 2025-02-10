import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../Search';

describe('Search Component', () => {
  it('renders search input with initial value', () => {
    render(<Search searchTerm="initial" onSearch={() => {}} />);
    expect(screen.getByDisplayValue('initial')).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted', () => {
    const onSearch = vi.fn();
    render(<Search searchTerm="" onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Поиск...');
    const button = screen.getByText('Поиск');

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith('test search');
  });

  it('updates input value when typing', () => {
    render(<Search searchTerm="" onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Поиск...');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });
});
