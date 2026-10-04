import { Link } from 'react-router-dom';
import ProductImage from '../ui/ProductImage';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-orange-100 transition hover:-translate-y-0.5 hover:shadow-card sm:rounded-3xl"
    >
      <ProductImage src={category.imageUrl} alt="" className="aspect-[16/10] w-full transition duration-300 group-hover:scale-[1.02]" />
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="font-display text-lg leading-tight sm:text-2xl">{category.name}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-xs leading-5 text-stone-600 sm:mt-2 sm:text-sm sm:leading-6">{category.description}</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-700 sm:mt-3">
          {category.productCount} {category.productCount === 1 ? 'product' : 'products'} →
        </p>
      </div>
    </Link>
  );
}
