import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../api/catalog';
import ProductFilter from '../components/catalog/ProductFilter';
import ProductGrid from '../components/catalog/ProductGrid';
import EmptyState from '../components/ui/EmptyState';
import { CardGridSkeleton } from '../components/ui/LoadingSkeleton';
import Pagination from '../components/ui/Pagination';
import { useCategories } from '../hooks/useCategories';
import { useDebouncedValue, usePageTitle } from '../hooks/useDebouncedValue';

const safety = {
  kids: 'These are milder picks for families with children. An adult should still do the lighting.',
  family: 'Chosen for a shared celebration at home or in a courtyard.',
  adults: 'These include louder or aerial crackers. They are meant for adult customers and open spaces.',
};

export default function ProductsPage() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();
  const offersLocked = pathname === '/offers';
  const { categories } = useCategories();
  const [result, setResult] = useState({ items: [], meta: { page: 1, totalPages: 0, total: 0 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [search, setSearch] = useState(params.get('q') || '');
  const debouncedSearch = useDebouncedValue(search);
  usePageTitle(offersLocked ? 'Offers' : 'Crackers');

  const category = slug || params.get('category') || '';
  const ageGroup = params.get('ageGroup') || '';
  const sort = params.get('sort') || 'newest';
  const page = Number(params.get('page') || 1);
  const offers = offersLocked || params.get('offers') === 'true';

  const urlQuery = params.get('q') || '';
  const paramsRef = useRef(params);
  const lastPushedQuery = useRef(urlQuery);
  paramsRef.current = params;

  useEffect(() => {
    if (debouncedSearch === lastPushedQuery.current) return;
    const next = new URLSearchParams(paramsRef.current);
    if (debouncedSearch) next.set('q', debouncedSearch);
    else next.delete('q');
    next.delete('page');
    lastPushedQuery.current = debouncedSearch;
    setParams(next, { replace: true });
  }, [debouncedSearch, setParams]);

  // The header search and "Clear filters" change ?q= from outside this page.
  useEffect(() => {
    if (urlQuery === lastPushedQuery.current) return;
    lastPushedQuery.current = urlQuery;
    setSearch(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    fetchProducts({
      category: category || undefined,
      ageGroup: ageGroup || undefined,
      sort,
      page,
      offers: offers ? 'true' : undefined,
      search: urlQuery || undefined,
      limit: 24,
    })
      .then((data) => {
        if (active) setResult(data);
      })
      .catch(() => {
        if (active) setError('Products could not be loaded.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [category, ageGroup, sort, page, offers, urlQuery, slug, reloadKey]);

  function update(changes) {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === '' || value === false || value == null) next.delete(key);
      else next.set(key, String(value));
    });
    setParams(next);
  }

  const activeCategory = categories.find((item) => item.slug === category);

  return (
    <div className="page-wrap py-6 sm:py-8">
      <h1 className="font-display text-3xl sm:text-4xl">
        {offersLocked ? 'Offers' : activeCategory?.name || 'All crackers'}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-stone-600">
        {activeCategory?.description || 'Prices shown here are the discounted prices. The final amount is confirmed when the order is created.'}
      </p>
      {ageGroup && safety[ageGroup] && (
        <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-950">{safety[ageGroup]}</p>
      )}
      <div className="mt-6">
        <ProductFilter
          categories={categories}
          search={search}
          onSearch={setSearch}
          category={category}
          ageGroup={ageGroup}
          sort={sort}
          offers={offers}
          lockOffers={offersLocked}
          lockCategory={Boolean(slug)}
          onChange={update}
        />
      </div>
      <div className="mt-6">
        {loading && <CardGridSkeleton />}
        {error && <EmptyState title="Could not load products" body={error} actionLabel="Retry" onAction={() => setReloadKey((key) => key + 1)} />}
        {!loading && !error && result.items.length === 0 && (
          <EmptyState title="No crackers match" body="Try another category, or clear the search." actionLabel="Clear filters" actionTo="/products" />
        )}
        {!loading && !error && <ProductGrid products={result.items} />}
        <Pagination
          page={result.meta.page}
          totalPages={result.meta.totalPages}
          onPage={(nextPage) => update({ page: nextPage })}
        />
      </div>
    </div>
  );
}
