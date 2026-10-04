import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct, fetchProducts } from '../api/catalog';
import ProductDetails from '../components/catalog/ProductDetails';
import ProductRail from '../components/catalog/ProductRail';
import EmptyState from '../components/ui/EmptyState';
import { LineSkeleton } from '../components/ui/LoadingSkeleton';
import SectionHeader from '../components/ui/SectionHeader';
import { usePageTitle } from '../hooks/useDebouncedValue';

const RELATED_SIZE = 6;

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  usePageTitle(product?.name || 'Product');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    setRelated([]);

    fetchProduct(slug)
      .then((item) => {
        if (!active) return;
        setProduct(item);
        if (!item.category?.slug) return;
        fetchProducts({ category: item.category.slug, limit: RELATED_SIZE + 1 })
          .then((result) => {
            if (active) setRelated(result.items.filter((other) => other.id !== item.id).slice(0, RELATED_SIZE));
          })
          .catch(() => {});
      })
      .catch(() => {
        if (active) setError('This product is unavailable.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <div className="page-wrap py-6 sm:py-8">
      {loading && <LineSkeleton />}
      {!loading && error && (
        <EmptyState title="Product not found" body={error} actionLabel="Back to crackers" actionTo="/products" />
      )}
      {!loading && !error && product && <ProductDetails key={product.id} product={product} />}
      {related.length > 0 && (
        <section className="pt-10">
          <SectionHeader
            title={`More from ${product.category.name}`}
            to={`/categories/${product.category.slug}`}
          />
          <ProductRail products={related} />
        </section>
      )}
    </div>
  );
}
