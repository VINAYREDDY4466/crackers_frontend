import { useEffect, useState } from 'react';
import { fetchDashboard } from '../../api/admin';
import AnalyticsChart from '../../components/admin/AnalyticsChart';
import KpiCard from '../../components/admin/KpiCard';
import { usePageTitle } from '../../hooks/useDebouncedValue';

export default function AnalyticsPage() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  usePageTitle('Analytics');

  useEffect(() => {
    fetchDashboard(days).then(setData).catch(() => setData(null));
  }, [days]);

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl">Analytics</h1>
        <div className="flex gap-2">
          {[7, 30].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setDays(value)}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold ${days === value ? 'bg-brand-700 text-white' : 'bg-white ring-1 ring-orange-100'}`}
            >
              {value} days
            </button>
          ))}
        </div>
      </div>
      {data && (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <KpiCard label="WhatsApp clicks" value={data.kpis.whatsappRedirects} hint="Recorded clicks, not confirmed messages" />
            <KpiCard label="Orders received" value={data.funnel.ordersReceived} />
            <KpiCard label="Conversion" value={`${data.conversion.rate}%`} hint={data.conversion.label} />
          </div>
          <AnalyticsChart title="WhatsApp redirects" data={data.redirects.series} />
          <AnalyticsChart title="Orders created" data={data.ordersSeries} />
          <section className="rounded-3xl bg-white p-5 ring-1 ring-orange-100">
            <h2 className="font-semibold">Product journey</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="text-xs uppercase text-stone-500">
                  <tr>
                    <th className="py-2">Product</th>
                    <th>Views</th>
                    <th>Add to cart</th>
                    <th>In WhatsApp orders</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topProducts.map((product) => (
                    <tr key={product.id} className="border-t border-orange-50">
                      <td className="py-2">{product.name}</td>
                      <td>{product.views}</td>
                      <td>{product.carts}</td>
                      <td>{product.orders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
