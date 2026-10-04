import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/money';
import ProductImage from '../ui/ProductImage';
import QuantitySelector from '../ui/QuantitySelector';

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCart();
  const discount = (item.originalPrice - item.finalPrice) * item.quantity;

  return (
    <article className="flex gap-3 border-b border-orange-100 py-4">
      <ProductImage src={item.imageUrl} alt="" className="h-20 w-20 shrink-0 rounded-2xl" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug">{item.name}</h3>
          <button type="button" onClick={() => removeItem(item.productId)} className="text-xs font-semibold text-red-600">
            Remove
          </button>
        </div>
        <p className="mt-1 text-sm text-stone-500">
          {item.unit ? `(${item.unit}) · ` : ''}
          {formatINR(item.finalPrice)} each
          {discount > 0 ? ` · saved ${formatINR(discount)}` : ''}
        </p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <QuantitySelector value={item.quantity} onChange={(quantity) => updateQty(item.productId, quantity)} />
          <p className="font-semibold">{formatINR(item.finalPrice * item.quantity)}</p>
        </div>
      </div>
    </article>
  );
}
