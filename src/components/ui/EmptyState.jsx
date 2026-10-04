import { Link } from 'react-router-dom';

export default function EmptyState({ title, body, actionLabel, actionTo, onAction }) {
  return (
    <div className="rounded-3xl border border-dashed border-orange-200 bg-white px-6 py-14 text-center">
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      {body && <p className="mx-auto mt-2 max-w-md text-sm text-stone-600">{body}</p>}
      {actionTo && (
        <Link to={actionTo} className="mt-5 inline-flex min-h-11 items-center rounded-full bg-brand-700 px-5 text-sm font-semibold text-white">
          {actionLabel}
        </Link>
      )}
      {onAction && (
        <button type="button" onClick={onAction} className="mt-5 inline-flex min-h-11 items-center rounded-full bg-brand-700 px-5 text-sm font-semibold text-white">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
