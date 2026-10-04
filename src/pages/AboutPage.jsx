import { useShop } from '../context/ShopContext';
import { usePageTitle } from '../hooks/useDebouncedValue';

export default function AboutPage() {
  const { settings } = useShop();
  usePageTitle('About');
  return (
    <div className="page-wrap max-w-3xl py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">About</p>
      <h1 className="mt-2 font-display text-4xl">{settings.shopName}</h1>
      <p className="mt-4 text-base leading-7 text-stone-700">{settings.about}</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          ['No account', 'Browse and order without registering.'],
          ['Clear prices', 'Discounts are shown before you add anything.'],
          ['WhatsApp', 'The order message is written for you.'],
        ].map(([title, text]) => (
          <article key={title} className="rounded-3xl bg-white p-4 ring-1 ring-orange-100">
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
