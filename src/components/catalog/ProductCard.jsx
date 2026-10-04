import { Link } from 'react-router-dom';
import { AGE_LABELS, AGE_STYLES } from '../../utils/labels';
import { formatINR } from '../../utils/money';
import ProductImage from '../ui/ProductImage';
import CartAction from './CartAction';

function isLowStock(product) {
  if (product.stockStatus === 'low_stock') return true;
  return product.stockQuantity != null && product.stockQuantity > 0 && product.stockQuantity <= 5;
}

export default function ProductCard({ product }) {
  const to = `/products/${product.slug}`;
  const discounted = product.discountPercentage > 0;
  const saving = product.originalPrice - product.finalPrice;
  const unavailable = product.stockStatus === 'out_of_stock';

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-orange-100 transition hover:-translate-y-0.5 hover:shadow-card">
      <Link to={to} className="relative block bg-white" aria-label={product.name}>
        {discounted && (
          <span className="absolute left-0 top-2 z-10 rounded-r-full bg-brand-600 px-2 py-0.5 text-[11px] font-bold text-white">
            {product.discountPercentage}% OFF
          </span>
        )}
        <ProductImage
          src={product.imageUrl}
          alt=""
          fit="contain"
          className={`aspect-square w-full p-2 transition duration-300 group-hover:scale-[1.03] ${unavailable ? 'opacity-50' : ''}`}
        />
        {unavailable && (
          <span className="absolute inset-x-0 bottom-0 bg-ink/75 py-1 text-center text-[11px] font-semibold text-white">
            Out of stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-2.5 sm:p-3">
        {product.category?.name && (
          <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-brand-700">{product.category.name}</p>
        )}
        <Link to={to} className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-ink hover:text-brand-700">
          {product.name}
        </Link>
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500">
          {product.unit && <span>({product.unit})</span>}
          <span className={`rounded-full px-1.5 py-0.5 font-semibold ${AGE_STYLES[product.ageGroup]}`}>
            {AGE_LABELS[product.ageGroup]}
          </span>
        </div>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-base font-bold text-ink sm:text-lg">{formatINR(product.finalPrice)}</span>
          {discounted && <span className="text-xs text-stone-400 line-through">{formatINR(product.originalPrice)}</span>}
        </div>
        <p className="min-h-4 text-[11px] font-medium">
          {discounted && <span className="text-green-700">Save {formatINR(saving)}</span>}
          {isLowStock(product) && <span className="text-amber-700">{discounted ? ' · ' : ''}Only a few left</span>}
        </p>
        <div className="mt-auto pt-1">
          <CartAction product={product} />
        </div>
      </div>
    </article>
  );
}
