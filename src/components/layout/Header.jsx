import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useShop } from '../../context/ShopContext';
import DiyaMark from '../ui/DiyaMark';
import Icon from '../ui/Icon';
import CategoryMenu from './CategoryMenu';
import HeaderSearch from './HeaderSearch';
import MobileMenu from './MobileMenu';
import { NAV_LINKS } from './navLinks';

const iconButton = 'inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-orange-50';

export default function Header() {
  const { settings } = useShop();
  const { count, openCart } = useCart();
  const { pathname, search } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname, search]);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_1px_0_rgba(234,88,12,0.12)]">
      <div className="page-wrap flex h-16 items-center gap-2 lg:h-[72px] lg:gap-6">
        <button type="button" aria-label="Open menu" className={`${iconButton} -ml-2 lg:hidden`} onClick={() => setMenuOpen(true)}>
          <Icon name="menu" className="h-6 w-6" />
        </button>

        <Link to="/" className="flex min-w-0 items-center gap-2">
          <DiyaMark className="h-9 w-9 shrink-0 lg:h-11 lg:w-11" />
          <span className="truncate font-display text-lg leading-none text-ink sm:text-xl lg:text-2xl">{settings.shopName}</span>
        </Link>

        <HeaderSearch className="hidden max-w-xl flex-1 md:flex" />

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            aria-label={searchOpen ? 'Close search' : 'Search'}
            aria-expanded={searchOpen}
            className={`${iconButton} md:hidden`}
            onClick={() => setSearchOpen((value) => !value)}
          >
            <Icon name={searchOpen ? 'close' : 'search'} className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={openCart}
            className="relative hidden h-11 items-center gap-2 rounded-full bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-800 lg:inline-flex"
          >
            <Icon name="cart" />
            Cart
            {count > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-400 px-1 text-xs font-bold text-ink">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-orange-100 px-4 py-3 md:hidden">
          <HeaderSearch autoFocus onDone={() => setSearchOpen(false)} />
        </div>
      )}

      <nav className="hidden bg-brand-700 lg:block" aria-label="Primary">
        <div className="page-wrap flex items-center gap-1">
          <CategoryMenu />
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `inline-flex h-11 items-center px-4 text-sm font-medium text-white transition ${isActive ? 'bg-white/15' : 'hover:bg-white/10'}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {menuOpen && <MobileMenu onClose={closeMenu} />}
    </header>
  );
}
