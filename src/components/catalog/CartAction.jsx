import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const MAX_QUANTITY = 50;

export default function CartAction({ product }) {
  const { items, addItem, updateQty } = useCart();
  const toast = useToast();
  const inCart = items.find((item) => item.productId === product.id);

  if (product.stockStatus === 'out_of_stock') {
    return (
      <button type="button" disabled className="h-10 w-full rounded-full bg-stone-100 text-xs font-semibold text-stone-400">
        Out of stock
      </button>
    );
  }

  if (inCart) {
    return (
      <div className="flex h-10 w-full items-center justify-between rounded-full bg-brand-700 text-white">
        <button
          type="button"
          aria-label={`Remove one ${product.name}`}
          onClick={() => updateQty(product.id, inCart.quantity - 1)}
          className="h-10 w-10 rounded-full text-lg font-semibold hover:bg-white/10"
        >
          −
        </button>
        <span className="text-sm font-semibold" aria-live="polite">{inCart.quantity}</span>
        <button
          type="button"
          aria-label={`Add one more ${product.name}`}
          disabled={inCart.quantity >= MAX_QUANTITY}
          onClick={() => updateQty(product.id, inCart.quantity + 1)}
          className="h-10 w-10 rounded-full text-lg font-semibold hover:bg-white/10 disabled:opacity-40"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (addItem(product, 1, { open: false })) toast.success(`${product.name} added to cart`);
      }}
      className="h-10 w-full rounded-full bg-brand-700 text-xs font-semibold text-white transition hover:bg-brand-800 sm:text-sm"
    >
      Add to Cart
    </button>
  );
}
