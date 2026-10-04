export default function KpiCard({ label, value, hint }) {
  return (
    <article className="rounded-3xl bg-white p-4 shadow-soft ring-1 ring-orange-100">
      <p className="text-sm text-stone-500">{label}</p>
      <p className="mt-2 font-display text-3xl text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-stone-500">{hint}</p>}
    </article>
  );
}
