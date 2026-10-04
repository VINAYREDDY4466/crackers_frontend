import ProductCard from './ProductCard';

const LAYOUTS = {
  wide: {
    track: 'no-scrollbar -mx-4 flex snap-x scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-6',
    item: 'w-[44%] shrink-0 snap-start sm:w-[30%] md:w-auto',
  },
  section: {
    track: 'no-scrollbar flex snap-x gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0',
    item: 'w-[44%] shrink-0 snap-start sm:w-[30%] md:w-[23%] lg:w-auto',
  },
};

export default function ProductRail({ products, layout = 'wide' }) {
  const { track, item } = LAYOUTS[layout];
  return (
    <div className={track}>
      {products.map((product) => (
        <div key={product.id} className={item}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
