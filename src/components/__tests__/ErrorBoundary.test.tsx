import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';
import ErrorButton from '../ErrorButton';

describe('ErrorBoundary Component', () => {
  const originalConsoleError = console.error;
  const originalLocation = window.location;

  beforeAll(() => {
    console.error = vi.fn();
    vi.stubGlobal('location', { ...originalLocation, reload: vi.fn() });
  });

  afterAll(() => {
    console.error = originalConsoleError;
    vi.stubGlobal('location', originalLocation);
  });

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders error UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const errorButton = screen.getByText('Вызвать ошибку');
    fireEvent.click(errorButton);

    expect(screen.getByText('Что-то пошло не так')).toBeInTheDocument();
    expect(screen.getByText('Перезагрузить страницу')).toBeInTheDocument();
  });

  it('reloads page when reload button is clicked', () => {
    const reloadMock = vi.fn();
    vi.spyOn(window.location, 'reload').mockImplementation(reloadMock);

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const errorButton = screen.getByText('Вызвать ошибку');
    fireEvent.click(errorButton);

    const reloadButton = screen.getByText('Перезагрузить страницу');
    fireEvent.click(reloadButton);

    expect(reloadMock).toHaveBeenCalled();
  });
});
