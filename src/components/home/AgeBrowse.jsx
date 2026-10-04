import { Link } from 'react-router-dom';

const groups = [
  { id: 'kids', title: 'For Kids', note: 'Mild picks. An adult lights them.', tone: 'from-sky-50 to-white text-sky-800' },
  { id: 'family', title: 'For Families', note: 'Fountains and packs for home.', tone: 'from-amber-50 to-white text-amber-900' },
  { id: 'adults', title: 'For Adults', note: 'Rockets and sound, open grounds.', tone: 'from-red-50 to-white text-red-800' },
];

export default function AgeBrowse() {
  return (
    <section className="page-wrap pt-8">
      <h2 className="mb-3 font-display text-2xl sm:text-3xl">Shop by age</h2>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {groups.map((group) => (
          <Link
            key={group.id}
            to={`/products?ageGroup=${group.id}`}
            className={`rounded-2xl bg-gradient-to-br p-3 ring-1 ring-orange-100 transition hover:-translate-y-0.5 hover:shadow-soft sm:p-5 ${group.tone}`}
          >
            <p className="font-display text-lg leading-tight sm:text-2xl">{group.title}</p>
            <p className="mt-1 text-xs text-stone-600 sm:text-sm">{group.note}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
