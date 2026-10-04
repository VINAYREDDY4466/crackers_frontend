import { useEffect, useState } from 'react';
import { fetchDashboard } from '../../api/admin';
import AnalyticsChart from '../../components/admin/AnalyticsChart';
import KpiCard from '../../components/admin/KpiCard';
import EmptyState from '../../components/ui/EmptyState';
import { LineSkeleton } from '../../components/ui/LoadingSkeleton';
import { usePageTitle } from '../../hooks/useDebouncedValue';
import { formatINR } from '../../utils/money';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  usePageTitle('Dashboard');

  useEffect(() => {
    fetchDashboard(30).then(setData).catch(() => setError('Dashboard data could not be loaded.'));
  }, []);

  if (error) return <EmptyState title="Dashboard unavailable" body={error} />;
  if (!data) return <LineSkeleton />;

  const { kpis, redirects, funnel, conversion, topProducts } = data;

  return (
    <div className="grid gap-5">
      <h1 className="font-display text-4xl">Dashboard</h1>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="WhatsApp Redirects" value={kpis.whatsappRedirects.toLocaleString('en-IN')} />
        <KpiCard label="Orders" value={kpis.orders.toLocaleString('en-IN')} />
        <KpiCard label="Pending Payments" value={kpis.pendingPayments.toLocaleString('en-IN')} />
        <KpiCard label="Confirmed Orders" value={kpis.confirmedOrders.toLocaleString('en-IN')} />
        <KpiCard label="Revenue" value={formatINR(kpis.revenue)} hint="Only payments marked received" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard label="WhatsApp chats" value={(kpis.whatsappContacts ?? 0).toLocaleString('en-IN')} hint="Contact button, not orders" />
        <KpiCard label="Total products" value={kpis.totalProducts} />
        <KpiCard label="Active products" value={kpis.activeProducts} />
        <KpiCard label="Out of stock" value={kpis.outOfStock} />
        <KpiCard label="Categories" value={kpis.totalCategories} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <KpiCard label="Redirects today" value={redirects.today} />
        <KpiCard label="Last 7 days" value={redirects.last7} />
        <KpiCard label="Last 30 days" value={redirects.last30} />
      </div>
      <AnalyticsChart title="WhatsApp redirects" data={redirects.series} />
      <section className="grid gap-4 rounded-3xl bg-white p-5 ring-1 ring-orange-100 lg:grid-cols-2">
        <div>
          <h2 className="font-semibold">Orders</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex justify-between"><span>WhatsApp redirects</span><span>{funnel.whatsappRedirects}</span></li>
            <li className="flex justify-between"><span>Orders received</span><span>{funnel.ordersReceived}</span></li>
            <li className="flex justify-between"><span>Confirmed orders</span><span>{funnel.confirmedOrders}</span></li>
            <li className="flex justify-between"><span>Cancelled</span><span>{funnel.cancelledOrders}</span></li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold">Internal conversion</h2>
          <p className="mt-3 font-display text-4xl">{conversion.rate}%</p>
          <p className="mt-2 text-sm text-stone-600">
            {conversion.ordersReceived} received orders from {conversion.whatsappRedirects} recorded WhatsApp clicks.
          </p>
          <p className="mt-2 text-xs leading-5 text-stone-500">{conversion.label}</p>
        </div>
      </section>
      <section className="rounded-3xl bg-white p-5 ring-1 ring-orange-100">
        <h2 className="font-semibold">Top interacted products</h2>
        {topProducts.length === 0 && <p className="mt-3 text-sm text-stone-500">Views, cart adds, and WhatsApp orders will appear here.</p>}
        <ol className="mt-3 space-y-2 text-sm">
          {topProducts.map((product, index) => (
            <li key={product.id} className="flex justify-between gap-3">
              <span>{index + 1}. {product.name}</span>
              <span className="text-stone-500">{product.interactions} interactions</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
