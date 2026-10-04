import ProductCard from './ProductCard';

export const PRODUCT_GRID = 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6';

export default function ProductGrid({ products }) {
  return (
    <div className={PRODUCT_GRID}>
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
