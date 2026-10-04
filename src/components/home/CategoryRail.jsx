import { Link } from 'react-router-dom';
import ProductImage from '../ui/ProductImage';
import SectionHeader from '../ui/SectionHeader';

export default function CategoryRail({ categories }) {
  if (!categories.length) return null;

  return (
    <section className="page-wrap pt-8">
      <SectionHeader title="Shop by category" to="/categories" />
      <div className="no-scrollbar -mx-4 flex snap-x scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:gap-4 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.slug}`}
            className="group flex w-[76px] shrink-0 snap-start flex-col items-center gap-2 text-center sm:w-24"
          >
            <span className="block h-[72px] w-[72px] overflow-hidden rounded-full bg-white p-1 ring-2 ring-orange-100 transition group-hover:ring-brand-500 sm:h-[88px] sm:w-[88px]">
              <ProductImage src={category.imageUrl} alt="" className="h-full w-full rounded-full" />
            </span>
            <span className="line-clamp-2 text-xs font-semibold leading-tight text-ink sm:text-sm">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
