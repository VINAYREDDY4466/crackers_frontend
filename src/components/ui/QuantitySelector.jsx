export default function QuantitySelector({ value, onChange, disabled = false }) {
  return (
    <div className="inline-flex items-center rounded-full border border-orange-200 bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || value <= 1}
        onClick={() => onChange(value - 1)}
        className="h-11 w-11 rounded-full text-lg font-semibold text-brand-700 disabled:text-stone-300"
      >
        −
      </button>
      <span className="min-w-8 text-center text-sm font-semibold">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled || value >= 50}
        onClick={() => onChange(value + 1)}
        className="h-11 w-11 rounded-full text-lg font-semibold text-brand-700 disabled:text-stone-300"
      >
        +
      </button>
    </div>
  );
}
