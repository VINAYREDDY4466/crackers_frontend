import { useCallback, useEffect, useState } from 'react';
import { fetchHome } from '../api/catalog';
import ProductRail from '../components/catalog/ProductRail';
import AgeBrowse from '../components/home/AgeBrowse';
import BannerCarousel from '../components/home/BannerCarousel';
import CategoryRail from '../components/home/CategoryRail';
import CategorySection from '../components/home/CategorySection';
import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';
import TrustStrip from '../components/home/TrustStrip';
import EmptyState from '../components/ui/EmptyState';
import { BannerSkeleton, CardGridSkeleton } from '../components/ui/LoadingSkeleton';
import SectionHeader from '../components/ui/SectionHeader';
import { useShop } from '../context/ShopContext';
import { usePageTitle } from '../hooks/useDebouncedValue';

export default function HomePage() {
  const { settings } = useShop();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  usePageTitle('Home');

  const load = useCallback(() => {
    setLoading(true);
    setError('');
    fetchHome()
      .then(setData)
      .catch(() => setError('The catalog could not be loaded.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      {loading && <BannerSkeleton />}
      {!loading && (data?.banners.length ? <BannerCarousel banners={data.banners} /> : <Hero />)}
      <TrustStrip />

      {error && (
        <div className="page-wrap py-8">
          <EmptyState title="We could not load the shop" body={error} actionLabel="Try again" onAction={load} />
        </div>
      )}

      {loading && (
        <div className="page-wrap py-8">
          <CardGridSkeleton count={6} />
        </div>
      )}

      {data && (
        <>
          <CategoryRail categories={data.categories} />
          {data.popular.length > 0 && (
            <section className="page-wrap pt-8">
              <SectionHeader title="Popular picks" subtitle="The biggest discounts this Diwali" to="/offers" />
              <ProductRail products={data.popular} />
            </section>
          )}
          <AgeBrowse />
          {data.sections.length > 0 && (
            <div className="page-wrap grid gap-4 pt-8 sm:gap-5">
              {data.sections.map((section) => <CategorySection key={section.category.id} section={section} />)}
            </div>
          )}
        </>
      )}

      <HowItWorks />
      <section className="page-wrap pb-4">
        <div className="rounded-3xl bg-white px-5 py-6 ring-1 ring-orange-100 sm:px-8">
          <p className="text-sm font-semibold text-brand-700">A note on safety</p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">{settings.safetyNote}</p>
        </div>
      </section>
    </>
  );
}
