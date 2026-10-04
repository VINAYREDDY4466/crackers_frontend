import { useEffect, useState } from 'react';
import { fetchCategories } from '../api/catalog';

let cache = null;

export function invalidateCategories() {
  cache = null;
}

export function useCategories() {
  const [categories, setCategories] = useState(cache?.data || []);
  const [loading, setLoading] = useState(!cache?.data);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    if (!cache) cache = { promise: fetchCategories() };

    cache.promise
      .then((data) => {
        if (cache) cache.data = data;
        if (active) setCategories(data);
      })
      .catch(() => {
        cache = null;
        if (active) setError('Categories could not be loaded.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { categories, loading, error };
}
