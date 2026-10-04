import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import Icon from '../ui/Icon';
import ProductImage from '../ui/ProductImage';

export default function CategoryMenu() {
  const { categories } = useCategories();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname, search } = useLocation();

  useEffect(() => setOpen(false), [pathname, search]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    const onClick = (event) => !ref.current?.contains(event.target) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onMouseEnter={() => setOpen(true)}
        className="inline-flex h-11 items-center gap-2 bg-brand-800 px-4 text-sm font-semibold text-white"
      >
        <Icon name="grid" className="h-4 w-4" />
        All categories
        <Icon name="chevronDown" className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 w-[560px] rounded-b-2xl bg-white p-3 shadow-card ring-1 ring-orange-100">
          <div className="grid grid-cols-2 gap-1">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="flex items-center gap-3 rounded-xl p-2 hover:bg-orange-50"
              >
                <ProductImage src={category.imageUrl} alt="" className="h-10 w-10 shrink-0 rounded-lg" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">{category.name}</span>
                  <span className="text-xs text-stone-500">{category.productCount} products</span>
                </span>
              </Link>
            ))}
          </div>
          <Link to="/categories" className="mt-2 block rounded-xl bg-orange-50 py-2 text-center text-sm font-semibold text-brand-700">
            See all categories
          </Link>
        </div>
      )}
    </div>
  );
}
