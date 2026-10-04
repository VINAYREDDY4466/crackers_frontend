import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useCategories } from '../../hooks/useCategories';
import DiyaMark from '../ui/DiyaMark';
import Icon from '../ui/Icon';
import ProductImage from '../ui/ProductImage';
import HeaderSearch from './HeaderSearch';
import { NAV_LINKS } from './navLinks';

export default function MobileMenu({ onClose }) {
  const { settings } = useShop();
  const { categories } = useCategories();

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" aria-label="Close menu" className="absolute inset-0 bg-ink/50" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="relative flex h-full w-[86%] max-w-sm animate-slide-in-left flex-col bg-white shadow-soft"
      >
        <div className="flex items-center justify-between border-b border-orange-100 bg-cream px-4 py-3">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <DiyaMark className="h-9 w-9" />
            <span className="font-display text-xl">{settings.shopName}</span>
          </Link>
          <button type="button" aria-label="Close menu" onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-orange-100">
            <Icon name="close" />
          </button>
        </div>

        <div className="px-4 py-3">
          <HeaderSearch onDone={onClose} />
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-6" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) => `flex min-h-12 items-center gap-3 rounded-xl px-3 text-[15px] font-medium ${isActive ? 'bg-orange-50 text-brand-700' : 'text-ink hover:bg-orange-50'}`}
            >
              <Icon name={link.icon} className="h-5 w-5 text-brand-600" />
              {link.label}
            </NavLink>
          ))}

          {categories.length > 0 && (
            <>
              <p className="mt-4 px-3 pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Shop by category</p>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categories/${category.slug}`}
                  onClick={onClose}
                  className="flex min-h-12 items-center gap-3 rounded-xl px-3 hover:bg-orange-50"
                >
                  <ProductImage src={category.imageUrl} alt="" className="h-9 w-9 shrink-0 rounded-lg" />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{category.name}</span>
                  <span className="text-xs text-stone-400">{category.productCount}</span>
                </Link>
              ))}
            </>
          )}
        </nav>

        {settings.contactPhone && (
          <a href={`tel:${settings.contactPhone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-3 border-t border-orange-100 px-5 py-4 text-sm font-semibold text-brand-700">
            <Icon name="phone" />
            Call {settings.contactPhone}
          </a>
        )}
      </aside>
    </div>,
    document.body,
  );
}
