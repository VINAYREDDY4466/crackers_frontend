import { useEffect, useState } from 'react';

export function useDebouncedValue(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Deepam Crackers` : 'Deepam Crackers';
  }, [title]);
}
