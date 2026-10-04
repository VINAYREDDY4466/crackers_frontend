import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const previous = document.querySelector('meta[name="robots"]');
    const tag = previous || document.createElement('meta');
    tag.setAttribute('name', 'robots');
    tag.setAttribute('content', 'noindex');
    if (!previous) document.head.appendChild(tag);
    return () => {
      if (!previous) tag.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream lg:grid lg:grid-cols-[240px_1fr]">
      <div className="hidden lg:block">
        <div className="sticky top-0 h-screen">
          <AdminSidebar />
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="relative h-full w-72">
            <AdminSidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
      <div>
        <div className="flex items-center justify-between border-b border-orange-100 px-4 py-3 lg:hidden">
          <p className="font-display text-xl">Deepam admin</p>
          <button type="button" className="min-h-11 rounded-full border border-orange-200 px-4 text-sm" onClick={() => setOpen(true)}>
            Menu
          </button>
        </div>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <Suspense fallback={<p className="text-sm text-stone-500">Loading…</p>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
