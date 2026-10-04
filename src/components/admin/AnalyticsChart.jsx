import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function AnalyticsChart({ title, data, dataKey = 'count', empty = 'No data for this range.' }) {
  const hasValues = data?.some((row) => row[dataKey] > 0);
  return (
    <section className="rounded-3xl bg-white p-4 ring-1 ring-orange-100">
      <h3 className="font-semibold">{title}</h3>
      {!hasValues ? (
        <p className="py-12 text-center text-sm text-stone-500">{empty}</p>
      ) : (
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke="#FFEDD5" vertical={false} />
              <XAxis dataKey="date" tickFormatter={(value) => String(value).slice(5)} tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} width={32} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey={dataKey} fill="#EA580C" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
