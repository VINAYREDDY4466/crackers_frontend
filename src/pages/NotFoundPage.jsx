import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/useDebouncedValue';

export default function NotFoundPage() {
  usePageTitle('Not found');
  return (
    <div className="page-wrap py-16 text-center">
      <h1 className="font-display text-4xl">This page is not in the catalog</h1>
      <p className="mt-3 text-sm text-stone-600">The link may be old, or the product may have been removed.</p>
      <Link to="/" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-brand-700 px-5 text-sm font-semibold text-white">
        Back home
      </Link>
    </div>
  );
}
