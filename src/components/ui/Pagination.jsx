export default function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null;
  return (
    <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
        className="min-h-11 rounded-full border border-orange-200 bg-white px-4 text-sm font-semibold disabled:opacity-40"
      >
        Previous
      </button>
      <span className="text-sm text-stone-600">
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPage(page + 1)}
        className="min-h-11 rounded-full border border-orange-200 bg-white px-4 text-sm font-semibold disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}
