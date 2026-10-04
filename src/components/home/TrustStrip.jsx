import Icon from '../ui/Icon';

const points = [
  { icon: 'user', title: 'No login needed', text: 'Browse and order as a guest' },
  { icon: 'badge', title: 'Direct factory prices', text: 'Discounts shown upfront' },
  { icon: 'shield', title: 'Safety first', text: 'Age guidance on every item' },
  { icon: 'chat', title: 'Order on WhatsApp', text: 'Confirm with our team' },
];

export default function TrustStrip() {
  return (
    <section className="page-wrap pt-4">
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-2 ring-1 ring-orange-100 lg:grid-cols-4">
        {points.map((point) => (
          <div key={point.title} className="flex items-center gap-3 rounded-xl px-2 py-2 sm:px-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-brand-700">
              <Icon name={point.icon} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-tight text-ink">{point.title}</span>
              <span className="hidden text-xs text-stone-500 sm:block">{point.text}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
