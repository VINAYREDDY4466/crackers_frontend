import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

export default function Hero() {
  const { settings } = useShop();

  return (
    <section className="page-wrap grid items-center gap-8 py-8 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
      <div>
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700 shadow-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          This Diwali
        </p>
        <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
          Celebrate Diwali With Light, Joy & Crackers
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
          {settings.tagline}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link to="/products" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-700 px-6 font-semibold text-white">
            Explore Crackers
          </Link>
          <Link to="/categories" className="inline-flex min-h-12 items-center justify-center rounded-full border border-orange-200 bg-white px-6 font-semibold text-ink">
            View Categories
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -left-3 top-6 h-3 w-3 rounded-full bg-gold-400" />
        <div className="absolute right-6 top-2 h-2 w-2 rounded-full bg-brand-500" />
        <div className="absolute bottom-8 right-2 h-2.5 w-2.5 rounded-full bg-gold-500" />
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-500 to-gold-500 p-3 shadow-card">
          <div className="rounded-[1.5rem] bg-cream p-4 sm:p-6">
            <p className="font-display text-3xl text-ink">Light first. Order simply.</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Pick a pack, check the total, and send it on WhatsApp. We confirm the order with you after that.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              {[
                ['Browse', 'No login'],
                ['Cart', 'Live total'],
                ['WhatsApp', 'One tap'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl bg-white px-2 py-3 shadow-soft">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-xs text-stone-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
