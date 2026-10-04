import { Link } from 'react-router-dom';
import ProductRail from '../catalog/ProductRail';
import Icon from '../ui/Icon';
import ProductImage from '../ui/ProductImage';

export default function CategorySection({ section }) {
  const { category, products } = section;
  const to = `/categories/${category.slug}`;

  return (
    <section aria-label={category.name} className="rounded-3xl bg-white p-3 ring-1 ring-orange-100 sm:p-4">
      <div className="grid gap-3 lg:grid-cols-[200px_1fr] lg:gap-4">
        <div className="flex items-center justify-between gap-3 lg:hidden">
          <Link to={to} className="flex min-w-0 items-center gap-3">
            <ProductImage src={category.imageUrl} alt="" className="h-12 w-12 shrink-0 rounded-xl" />
            <span className="min-w-0">
              <span className="block truncate font-display text-xl text-ink">{category.name}</span>
              <span className="text-xs text-stone-500">{category.productCount} products</span>
            </span>
          </Link>
          <Link to={to} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700">
            View all
            <Icon name="chevronRight" className="h-4 w-4" />
          </Link>
        </div>

        <Link to={to} className="group relative hidden min-h-[280px] overflow-hidden rounded-2xl lg:block">
          <ProductImage src={category.imageUrl} alt="" className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 p-4 text-white">
            <span className="block font-display text-2xl leading-tight">{category.name}</span>
            <span className="mt-1 line-clamp-2 block text-xs text-orange-50/80">{category.description}</span>
            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
              View all {category.productCount}
              <Icon name="chevronRight" className="h-3.5 w-3.5" />
            </span>
          </span>
        </Link>

        <ProductRail layout="section" products={products} />
      </div>
    </section>
  );
}
