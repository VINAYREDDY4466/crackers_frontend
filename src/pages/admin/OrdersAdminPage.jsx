import { useEffect, useState } from 'react';
import { fetchAdminOrders } from '../../api/admin';
import OrderTable from '../../components/admin/OrderTable';
import Pagination from '../../components/ui/Pagination';
import { ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from '../../utils/labels';
import { useDebouncedValue, usePageTitle } from '../../hooks/useDebouncedValue';

export default function OrdersAdminPage() {
  const [search, setSearch] = useState('');
  const debounced = useDebouncedValue(search);
  const [orderStatus, setOrderStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ items: [], meta: { page: 1, totalPages: 1 } });
  const [error, setError] = useState('');
  usePageTitle('Orders');

  useEffect(() => {
    setPage(1);
  }, [debounced, orderStatus, paymentStatus]);

  useEffect(() => {
    fetchAdminOrders({
      search: debounced || undefined,
      orderStatus: orderStatus || undefined,
      paymentStatus: paymentStatus || undefined,
      page,
      limit: 20,
    })
      .then(setResult)
      .catch(() => setError('Orders could not be loaded.'));
  }, [debounced, orderStatus, paymentStatus, page]);

  return (
    <div className="grid gap-4">
      <h1 className="font-display text-4xl">Orders</h1>
      <div className="grid gap-3 md:grid-cols-3">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Order, name, or phone" className="min-h-11 rounded-2xl border border-orange-100 px-3" />
        <select value={orderStatus} onChange={(event) => setOrderStatus(event.target.value)} className="min-h-11 rounded-2xl border border-orange-100 px-3">
          <option value="">All order statuses</option>
          {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <select value={paymentStatus} onChange={(event) => setPaymentStatus(event.target.value)} className="min-h-11 rounded-2xl border border-orange-100 px-3">
          <option value="">All payment statuses</option>
          {Object.entries(PAYMENT_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <OrderTable orders={result.items} />
      <Pagination page={result.meta.page} totalPages={result.meta.totalPages} onPage={setPage} />
    </div>
  );
}
