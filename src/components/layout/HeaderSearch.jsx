import { useEffect, useId, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../ui/Icon';

export default function HeaderSearch({ className = '', autoFocus = false, onDone }) {
  const id = useId();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const urlQuery = params.get('q') || '';
  const [value, setValue] = useState(urlQuery);

  useEffect(() => {
    setValue(urlQuery);
  }, [urlQuery]);

  function submit(event) {
    event.preventDefault();
    const term = value.trim().slice(0, 60);
    navigate(term ? `/products?q=${encodeURIComponent(term)}` : '/products');
    onDone?.();
  }

  return (
    <form role="search" onSubmit={submit} className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">Search crackers</label>
      <input
        id={id}
        type="search"
        value={value}
        autoFocus={autoFocus}
        maxLength={60}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search sparklers, flower pots, rockets…"
        className="h-11 w-full rounded-full border border-orange-200 bg-orange-50/50 pl-4 pr-12 text-sm placeholder:text-stone-400 focus:border-brand-500 focus:bg-white"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-1 top-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-white hover:bg-brand-800"
      >
        <Icon name="search" className="h-4 w-4" />
      </button>
    </form>
  );
}
