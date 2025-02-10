import '@testing-library/jest-dom/vitest';
import { vi, beforeEach } from 'vitest';

declare global {
  interface Window {
    localStorage: Storage;
  }
}

beforeEach(() => {
  window.localStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
    removeItem: vi.fn(),
    key: vi.fn(),
    length: 0,
  } as Storage;

  vi.stubGlobal('fetch', vi.fn());
});
