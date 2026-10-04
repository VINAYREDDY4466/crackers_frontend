import CategoryCard from '../components/catalog/CategoryCard';
import EmptyState from '../components/ui/EmptyState';
import { CardGridSkeleton } from '../components/ui/LoadingSkeleton';
import { useCategories } from '../hooks/useCategories';
import { usePageTitle } from '../hooks/useDebouncedValue';

export default function CategoriesPage() {
  const { categories, loading, error } = useCategories();
  usePageTitle('Categories');

  return (
    <div className="page-wrap py-6 sm:py-8">
      <h1 className="font-display text-3xl sm:text-4xl">Categories</h1>
      <p className="mt-2 max-w-xl text-sm text-stone-600">Choose a type of cracker. Each card opens the products in that group.</p>
      <div className="mt-6">
        {loading && <CardGridSkeleton count={6} />}
        {error && <EmptyState title="Nothing to show yet" body={error} />}
        {!loading && !error && categories.length === 0 && (
          <EmptyState title="No categories yet" body="The shop has not published categories." />
        )}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {categories.map((category) => <CategoryCard key={category.id} category={category} />)}
          </div>
        )}
      </div>
    </div>
  );
}
