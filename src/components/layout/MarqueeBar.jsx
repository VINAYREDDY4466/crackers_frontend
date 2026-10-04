import { useShop } from '../../context/ShopContext';

export default function MarqueeBar() {
  const { settings } = useShop();
  const items = (settings.marqueeItems || []).filter(Boolean);
  if (!settings.marqueeEnabled || items.length === 0) return null;

  const duration = Math.min(90, Math.max(20, items.join(' ').length * 0.2));
  const track = (
    <div className="flex min-w-[100vw] shrink-0 items-center justify-around">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-6 pr-6">
          <span>{item}</span>
          <span className="text-gold-400">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="group overflow-hidden bg-brand-800 py-2 text-xs font-medium text-orange-50 sm:text-sm">
      <p className="sr-only">{items.join('. ')}</p>
      <div
        aria-hidden="true"
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {track}
        {track}
      </div>
    </div>
  );
}
