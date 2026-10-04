import { AGE_LABELS, STOCK_LABELS } from '../../utils/labels';
import { formatINR } from '../../utils/money';

export default function ProductSpecs({ product }) {
  const rows = [
    ['Category', product.category?.name || '—'],
    ['Pack', product.unit || '—'],
    ['Suitable for', AGE_LABELS[product.ageGroup]],
    ['Availability', STOCK_LABELS[product.stockStatus]],
    ['MRP', formatINR(product.originalPrice)],
    ['Discount', product.discountPercentage > 0 ? `${product.discountPercentage}%` : 'No discount'],
    ['Offer price', formatINR(product.finalPrice)],
  ];

  return (
    <section className="rounded-3xl bg-white p-5 ring-1 ring-orange-100">
      <h2 className="font-display text-2xl">Specifications</h2>
      <dl className="mt-4 divide-y divide-orange-50 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[120px_1fr] gap-3 py-2.5 sm:grid-cols-[160px_1fr]">
            <dt className="text-stone-500">{label}</dt>
            <dd className="font-medium text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
