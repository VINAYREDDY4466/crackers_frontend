import Icon from '../ui/Icon';

const COMMON_TIPS = [
  'Light crackers in an open space, away from vehicles, dry leaves, and buildings.',
  'Keep a bucket of water or sand nearby.',
  'Never relight a cracker that did not go off. Wait, then soak it in water.',
  'Wear cotton clothes and step back right after lighting.',
];

const AGE_TIPS = {
  kids: 'Children should only use this with an adult beside them. An adult should do the lighting.',
  family: 'Keep children behind the adult who is lighting.',
  adults: 'For adults only. Check local timing and noise rules before use.',
};

export default function SafetyTips({ ageGroup }) {
  return (
    <section className="rounded-3xl bg-white p-5 ring-1 ring-orange-100">
      <h2 className="flex items-center gap-2 font-display text-2xl">
        <Icon name="shield" className="h-6 w-6 text-brand-600" />
        Safety tips
      </h2>
      <p className="mt-3 rounded-2xl bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">{AGE_TIPS[ageGroup]}</p>
      <ul className="mt-3 space-y-2 text-sm text-stone-600">
        {COMMON_TIPS.map((tip) => (
          <li key={tip} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
            {tip}
          </li>
        ))}
      </ul>
    </section>
  );
}
