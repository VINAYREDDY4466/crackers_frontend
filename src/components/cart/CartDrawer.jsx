import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/money';
import CartItem from './CartItem';

export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, discount, total } = useCart();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/40" onClick={closeCart}>
      <aside
        className="flex h-full w-full max-w-md flex-col bg-cream shadow-soft"
        onClick={(event) => event.stopPropagation()}
        aria-label="Cart"
      >
        <div className="flex items-center justify-between border-b border-orange-100 px-4 py-4">
          <h2 className="font-display text-2xl">Your cart</h2>
          <button type="button" onClick={closeCart} className="min-h-11 rounded-full px-3 text-sm font-semibold">Close</button>
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 && <p className="py-10 text-sm text-stone-600">Your cart is empty. Add a few crackers to begin.</p>}
          {items.map((item) => <CartItem key={item.productId} item={item} />)}
        </div>
        {items.length > 0 && (
          <div className="border-t border-orange-100 bg-white p-4">
            <div className="mb-3 grid gap-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
              <div className="flex justify-between text-green-700"><span>Discount</span><span>-{formatINR(discount)}</span></div>
              <div className="flex justify-between font-semibold"><span>Total</span><span>{formatINR(total)}</span></div>
            </div>
            <Link
              to="/cart"
              onClick={closeCart}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-700 font-semibold text-white"
            >
              Continue to Order
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
