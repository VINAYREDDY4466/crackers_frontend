import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { trackEvent } from '../../api/catalog';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { AGE_LABELS, AGE_STYLES, STOCK_LABELS } from '../../utils/labels';
import { formatINR } from '../../utils/money';
import { trackingMeta } from '../../utils/session';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import ProductImage from '../ui/ProductImage';
import QuantitySelector from '../ui/QuantitySelector';
import ProductSpecs from './ProductSpecs';
import SafetyTips from './SafetyTips';

const PROMISES = [
  { icon: 'user', text: 'No account needed' },
  { icon: 'chat', text: 'Confirm on WhatsApp' },
  { icon: 'shield', text: 'Pay after confirmation' },
];

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const toast = useToast();
  const navigate = useNavigate();
  const unavailable = product.stockStatus === 'out_of_stock';
  const discounted = product.discountPercentage > 0;

  useEffect(() => {
    trackEvent({ eventType: 'product_view', productId: product.id, ...trackingMeta() });
  }, [product.id]);

  function add(openCart) {
    if (!addItem(product, quantity, { open: openCart })) {
      toast.error('This cracker is out of stock.');
      return false;
    }
    if (openCart) toast.success(`${product.name} added to cart`);
    return true;
  }

  return (
    <div className="grid gap-6">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-stone-500 sm:text-sm">
        <Link to="/" className="hover:text-brand-700">Home</Link>
        <Icon name="chevronRight" className="h-3.5 w-3.5" />
        {product.category && (
          <>
            <Link to={`/categories/${product.category.slug}`} className="hover:text-brand-700">{product.category.name}</Link>
            <Icon name="chevronRight" className="h-3.5 w-3.5" />
          </>
        )}
        <span className="truncate text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-6 md:grid-cols-2 lg:gap-10">
        <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-orange-100">
          {discounted && (
            <span className="absolute left-0 top-4 z-10 rounded-r-full bg-brand-600 px-3 py-1 text-sm font-bold text-white">
              {product.discountPercentage}% OFF
            </span>
          )}
          <ProductImage src={product.imageUrl} alt={product.name} fit="contain" className="aspect-square w-full p-4" />
        </div>

        <div>
          <div className="flex flex-wrap gap-2 text-xs">
            {product.category && (
              <Link to={`/categories/${product.category.slug}`} className="rounded-full bg-orange-50 px-2.5 py-1 font-semibold text-brand-700">
                {product.category.name}
              </Link>
            )}
            <span className={`rounded-full px-2.5 py-1 font-semibold ${AGE_STYLES[product.ageGroup]}`}>
              {AGE_LABELS[product.ageGroup]}
            </span>
          </div>
          <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{product.name}</h1>
          {product.unit && <p className="mt-1 text-sm text-stone-500">Pack: {product.unit}</p>}

          <div className="mt-5 rounded-2xl bg-cream p-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-bold text-ink">{formatINR(product.finalPrice)}</span>
              {discounted && (
                <>
                  <span className="text-base text-stone-400 line-through">{formatINR(product.originalPrice)}</span>
                  <span className="text-sm font-semibold text-green-700">
                    You save {formatINR(product.originalPrice - product.finalPrice)}
                  </span>
                </>
              )}
            </div>
            <p className={`mt-2 text-sm font-semibold ${unavailable ? 'text-red-600' : 'text-green-700'}`}>
              {STOCK_LABELS[product.stockStatus]}
            </p>
          </div>

          <p className="mt-5 text-sm leading-7 text-stone-600">{product.description}</p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <QuantitySelector value={quantity} onChange={setQuantity} disabled={unavailable} />
            <Button onClick={() => add(true)} disabled={unavailable} size="lg" className="sm:flex-1">
              {unavailable ? 'Out of stock' : 'Add to Cart'}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              disabled={unavailable}
              className="sm:flex-1"
              onClick={() => {
                if (add(false)) navigate('/order');
              }}
            >
              Order via WhatsApp
            </Button>
          </div>

          <ul className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-stone-600">
            {PROMISES.map((promise) => (
              <li key={promise.text} className="flex flex-col items-center gap-1 rounded-2xl bg-white p-3 ring-1 ring-orange-100">
                <Icon name={promise.icon} className="h-5 w-5 text-brand-600" />
                {promise.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ProductSpecs product={product} />
        <SafetyTips ageGroup={product.ageGroup} />
      </div>
    </div>
  );
}
