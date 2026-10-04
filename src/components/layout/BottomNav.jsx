import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Icon from '../ui/Icon';

const items = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/categories', label: 'Categories', icon: 'grid' },
  { to: '/offers', label: 'Offers', icon: 'tag' },
  { to: '/cart', label: 'Cart', icon: 'cart' },
  { to: '/contact', label: 'Contact', icon: 'phone' },
];

export default function BottomNav() {
  const { count } = useCart();

  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-orange-100 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_20px_-12px_rgba(28,25,23,0.3)] lg:hidden"
    >
      <div className="mx-auto grid max-w-xl grid-cols-5">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `relative flex min-h-[60px] flex-col items-center justify-center gap-1 text-[11px] font-medium ${isActive ? 'text-brand-700' : 'text-stone-500'}`}
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute inset-x-5 top-0 h-0.5 rounded-full bg-brand-600" />}
                <span className="relative">
                  <Icon name={item.icon} className="h-6 w-6" />
                  {item.icon === 'cart' && count > 0 && (
                    <span className="absolute -right-2.5 -top-1.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                      {count > 99 ? '99+' : count}
                    </span>
                  )}
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
