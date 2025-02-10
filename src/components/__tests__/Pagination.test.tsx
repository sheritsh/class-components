import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination Component', () => {
  it('renders correct page numbers', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    );

    expect(screen.getByText('1')).toHaveClass('bg-blue-500');
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    );

    expect(screen.getByText('Назад')).toBeDisabled();
    expect(screen.getByText('Вперед')).not.toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
    );

    expect(screen.getByText('Назад')).not.toBeDisabled();
    expect(screen.getByText('Вперед')).toBeDisabled();
  });

  it('calls onPageChange with correct page number', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
