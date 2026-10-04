import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function SectionHeader({ title, subtitle, to, linkLabel = 'View all' }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-stone-500">{subtitle}</p>}
      </div>
      {to && (
        <Link to={to} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800">
          {linkLabel}
          <Icon name="chevronRight" className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
