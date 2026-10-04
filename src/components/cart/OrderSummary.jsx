import { formatINR } from '../../utils/money';

export default function OrderSummary({ items, subtotal, discount, total, note }) {
  return (
    <aside className="rounded-3xl bg-white p-5 ring-1 ring-orange-100">
      <h2 className="font-display text-2xl">Order summary</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item.productId || item.productName} className="flex items-start justify-between gap-3 text-sm">
            <span>{item.name || item.productName} × {item.quantity}</span>
            <span className="font-semibold">{formatINR((item.finalPrice || 0) * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-2 border-t border-orange-100 pt-4 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
        <div className="flex justify-between text-green-700"><span>Total discount</span><span>-{formatINR(discount)}</span></div>
        <div className="flex justify-between text-base font-semibold"><span>Final total</span><span>{formatINR(total)}</span></div>
      </div>
      {note && <p className="mt-3 text-xs leading-5 text-stone-500">{note}</p>}
    </aside>
  );
}
