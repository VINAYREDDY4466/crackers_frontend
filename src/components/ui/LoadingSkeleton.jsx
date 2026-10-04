import { PRODUCT_GRID } from '../catalog/ProductGrid';

export function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-orange-100">
      <div className="aspect-square animate-pulse bg-orange-50" />
      <div className="space-y-2 p-3">
        <div className="h-3 w-1/2 animate-pulse rounded bg-orange-100" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-orange-100" />
        <div className="h-5 w-1/3 animate-pulse rounded bg-orange-100" />
        <div className="h-10 animate-pulse rounded-full bg-orange-100" />
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 12 }) {
  return (
    <div className={PRODUCT_GRID}>
      {Array.from({ length: count }, (_, index) => <ProductSkeleton key={index} />)}
    </div>
  );
}

export function BannerSkeleton() {
  return (
    <div className="page-wrap pt-4 sm:pt-6">
      <div className="aspect-[16/9] animate-pulse rounded-2xl bg-orange-100 sm:aspect-[21/8] sm:rounded-3xl" />
    </div>
  );
}

export function LineSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-8 w-48 animate-pulse rounded bg-orange-100" />
      <div className="h-4 w-full animate-pulse rounded bg-orange-50" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-orange-50" />
    </div>
  );
}
