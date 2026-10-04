import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

export default function Footer() {
  const { settings } = useShop();
  return (
    <footer className="mt-16 border-t border-orange-100 bg-white">
      <div className="page-wrap grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl">{settings.shopName}</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">{settings.tagline}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Shop</p>
          <div className="mt-3 grid gap-2 text-sm text-stone-600">
            <Link to="/categories">Categories</Link>
            <Link to="/products">All crackers</Link>
            <Link to="/offers">Offers</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Visit</p>
          <div className="mt-3 grid gap-2 text-sm text-stone-600">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Safety</p>
          <p className="mt-3 text-sm leading-6 text-stone-600">{settings.safetyNote}</p>
        </div>
      </div>
      <div className="border-t border-orange-100 py-4 text-center text-xs text-stone-500">
        Seasonal Diwali ordering. Payment is confirmed with the shop after WhatsApp, not on this website.
      </div>
    </footer>
  );
}
