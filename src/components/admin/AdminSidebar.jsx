import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const links = [
  ['/admin/dashboard', 'Dashboard'],
  ['/admin/orders', 'Orders'],
  ['/admin/products', 'Products'],
  ['/admin/categories', 'Categories'],
  ['/admin/banners', 'Banners'],
  ['/admin/analytics', 'Analytics'],
  ['/admin/settings', 'Settings'],
];

export default function AdminSidebar({ onNavigate }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-ink text-orange-50">
      <div className="px-5 py-6">
        <p className="text-xs uppercase tracking-[0.16em] text-gold-400">Deepam</p>
        <p className="mt-1 font-display text-2xl">Shop admin</p>
        <p className="mt-2 truncate text-xs text-stone-400">{admin?.email}</p>
      </div>
      <nav className="flex-1 px-3">
        {links.map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) => `mb-1 flex min-h-11 items-center rounded-2xl px-3 text-sm font-medium ${isActive ? 'bg-brand-500 text-white' : 'text-orange-50/80 hover:bg-white/10'}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        className="m-3 min-h-11 rounded-2xl border border-white/10 text-sm"
        onClick={() => {
          logout();
          navigate('/admin/login');
        }}
      >
        Logout
      </button>
    </div>
  );
}
