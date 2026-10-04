import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import EmptyState from '../components/ui/EmptyState';
import { useCart } from '../context/CartContext';
import { usePageTitle } from '../hooks/useDebouncedValue';

export default function CartPage() {
  const cart = useCart();
  usePageTitle('Cart');

  if (cart.items.length === 0) {
    return (
      <div className="page-wrap py-8">
        <EmptyState
          title="Your cart is empty"
          body="Add a few crackers and come back. You will not be asked to create an account."
          actionLabel="Explore crackers"
          actionTo="/products"
        />
      </div>
    );
  }

  return (
    <div className="page-wrap grid gap-6 py-8 lg:grid-cols-[1.4fr_0.8fr]">
      <section>
        <h1 className="font-display text-4xl">Cart</h1>
        <div className="mt-2">
          {cart.items.map((item) => <CartItem key={item.productId} item={item} />)}
        </div>
      </section>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <OrderSummary
          items={cart.items}
          subtotal={cart.subtotal}
          discount={cart.discount}
          total={cart.total}
          note="The shop confirms this total when the order is saved."
        />
        <Link to="/order" className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-700 font-semibold text-white">
          Continue to Order
        </Link>
      </div>
    </div>
  );
}
