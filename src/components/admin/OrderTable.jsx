import { Link } from 'react-router-dom';
import { formatDate, formatINR } from '../../utils/money';
import StatusBadge from '../ui/StatusBadge';

export default function OrderTable({ orders }) {
  if (!orders.length) {
    return <p className="rounded-3xl bg-white px-4 py-10 text-center text-sm text-stone-500 ring-1 ring-orange-100">No orders match these filters.</p>;
  }

  return (
    <>
      <div className="hidden overflow-x-auto rounded-3xl bg-white ring-1 ring-orange-100 md:block">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-stone-500">
            <tr>
              {['Order', 'Customer', 'Phone', 'Total', 'Payment', 'Status', 'Created', ''].map((heading) => (
                <th key={heading} className="px-4 py-3 font-medium">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-orange-50">
                <td className="px-4 py-3 font-semibold">{order.orderNumber}</td>
                <td className="px-4 py-3">{order.customer.name}</td>
                <td className="px-4 py-3">{order.customer.phone}</td>
                <td className="px-4 py-3">{formatINR(order.totalAmount)}</td>
                <td className="px-4 py-3"><StatusBadge status={order.paymentStatus} /></td>
                <td className="px-4 py-3"><StatusBadge status={order.orderStatus} /></td>
                <td className="px-4 py-3">{formatDate(order.createdAt)}</td>
                <td className="px-4 py-3">
                  <Link to={`/admin/orders/${order.id}`} className="font-semibold text-brand-700">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 md:hidden">
        {orders.map((order) => (
          <Link key={order.id} to={`/admin/orders/${order.id}`} className="rounded-3xl bg-white p-4 ring-1 ring-orange-100">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{order.orderNumber}</p>
              <p>{formatINR(order.totalAmount)}</p>
            </div>
            <p className="mt-1 text-sm text-stone-600">{order.customer.name} · {order.customer.phone}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge status={order.orderStatus} />
              <StatusBadge status={order.paymentStatus} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
