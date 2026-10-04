import { ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from '../../utils/labels';
import { formatDateTime, formatINR } from '../../utils/money';
import StatusBadge from '../ui/StatusBadge';

export default function OrderDetails({ order, onStatus, onPayment, saving }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
      <section className="rounded-3xl bg-white p-5 ring-1 ring-orange-100">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-display text-3xl">{order.orderNumber}</h2>
          <StatusBadge status={order.orderStatus} />
          <StatusBadge status={order.paymentStatus} />
        </div>
        <div className="mt-4 text-sm leading-6">
          <p className="font-semibold">{order.customer.name}</p>
          <p>{order.customer.phone}</p>
          <p>{order.customer.address}</p>
          {order.customer.notes && <p className="text-stone-500">Notes: {order.customer.notes}</p>}
        </div>
        <div className="mt-5 grid gap-3">
          {order.items.map((item) => (
            <div key={`${item.productId}-${item.productName}`} className="flex items-start justify-between gap-3 border-t border-orange-50 pt-3 text-sm">
              <div>
                <p className="font-medium">{item.productName} × {item.quantity}</p>
                <p className="text-stone-500">{item.discountPercentage}% off · {formatINR(item.finalPrice)} each</p>
              </div>
              <p className="font-semibold">{formatINR(item.subtotal)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t border-orange-100 pt-3 font-semibold">
          <span>Total · discount {formatINR(order.totalDiscount)}</span>
          <span>{formatINR(order.totalAmount)}</span>
        </div>
        <h3 className="mt-6 font-semibold">WhatsApp message</h3>
        <p className="mt-1 text-xs text-stone-500">
          Redirect {order.whatsappRedirected ? `recorded ${formatDateTime(order.whatsappRedirectedAt)}` : 'not recorded'}. A redirect is not proof the customer sent the message.
        </p>
        <pre className="mt-3 whitespace-pre-wrap rounded-2xl bg-cream p-3 text-sm leading-6">{order.whatsappMessage}</pre>
      </section>

      <div className="grid gap-4">
        <section className="rounded-3xl bg-white p-5 ring-1 ring-orange-100">
          <h3 className="font-semibold">Update status</h3>
          <form key={`status-${order.updatedAt}`} className="mt-3 grid gap-3" onSubmit={onStatus}>
            <select name="orderStatus" defaultValue={order.orderStatus} className="min-h-11 rounded-2xl border border-orange-100 px-3">
              {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <input name="note" placeholder="Optional note" maxLength={300} className="min-h-11 rounded-2xl border border-orange-100 px-3" />
            <button disabled={saving} className="min-h-11 rounded-full bg-brand-700 text-sm font-semibold text-white">Save order status</button>
          </form>
          <form key={`payment-${order.updatedAt}`} className="mt-4 grid gap-3 border-t border-orange-100 pt-4" onSubmit={onPayment}>
            <select name="paymentStatus" defaultValue={order.paymentStatus} className="min-h-11 rounded-2xl border border-orange-100 px-3">
              {Object.entries(PAYMENT_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <button disabled={saving} className="min-h-11 rounded-full border border-orange-200 text-sm font-semibold">Save payment status</button>
          </form>
        </section>
        <section className="rounded-3xl bg-white p-5 ring-1 ring-orange-100">
          <h3 className="font-semibold">Timeline</h3>
          <ol className="mt-4 space-y-4 border-l border-orange-200 pl-4">
            {order.timeline.map((event, index) => (
              <li key={`${event.status}-${event.at}-${index}`} className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-brand-500" />
                <p className="text-sm font-semibold">{ORDER_STATUS_LABELS[event.status] || event.status.replaceAll('_', ' ')}</p>
                <p className="text-xs text-stone-500">{formatDateTime(event.at)}</p>
                {event.note && <p className="text-sm text-stone-600">{event.note}</p>}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
