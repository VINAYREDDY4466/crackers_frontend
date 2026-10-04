import { useState } from 'react';
import { createOrder, reopenWhatsapp } from '../api/catalog';
import { errorMessage } from '../api/client';
import OrderSummary from '../components/cart/OrderSummary';
import WhatsAppButton from '../components/cart/WhatsAppButton';
import CustomerForm, { validateCustomer } from '../components/order/CustomerForm';
import EmptyState from '../components/ui/EmptyState';
import { useCart } from '../context/CartContext';
import { useShop } from '../context/ShopContext';
import { usePageTitle } from '../hooks/useDebouncedValue';
import { formatINR } from '../utils/money';
import { trackingMeta } from '../utils/session';

const empty = { name: '', phone: '', address: '', notes: '' };

export default function OrderPage() {
  const cart = useCart();
  const { settings } = useShop();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [placed, setPlaced] = useState(null);
  const [formError, setFormError] = useState('');
  usePageTitle('Order');

  function openWhatsapp(url) {
    const popup = window.open(url, '_blank', 'noopener,noreferrer');
    if (!popup) setFormError('WhatsApp was blocked by the browser. Use the button below to open it.');
  }

  async function submit() {
    const nextErrors = validateCustomer(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (!settings.isOrderingOpen) {
      setFormError('Ordering is closed right now.');
      return;
    }

    const id = requestId || crypto.randomUUID();
    setRequestId(id);
    setLoading(true);
    setFormError('');
    try {
      const response = await createOrder({
        clientRequestId: id,
        customer: values,
        items: cart.items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        ...trackingMeta(),
      });
      setPlaced(response.order);
      cart.clear();
      openWhatsapp(response.order.whatsappUrl);
    } catch (error) {
      setFormError(errorMessage(error, 'The order could not be created.'));
    } finally {
      setLoading(false);
    }
  }

  async function reopen() {
    setLoading(true);
    try {
      const response = await reopenWhatsapp(placed.id, trackingMeta());
      setPlaced(response.order);
      openWhatsapp(response.order.whatsappUrl);
    } catch (error) {
      setFormError(errorMessage(error, 'WhatsApp could not be opened again.'));
    } finally {
      setLoading(false);
    }
  }

  if (placed) {
    return (
      <div className="page-wrap max-w-2xl py-8">
        <h1 className="font-display text-4xl">WhatsApp is ready</h1>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          Order {placed.orderNumber} is saved. Opening WhatsApp does not mean the message was sent or the order is confirmed. Send the message, and the shop will update the status after speaking with you.
        </p>
        <pre className="mt-5 whitespace-pre-wrap rounded-3xl bg-white p-4 text-sm leading-6 ring-1 ring-orange-100">{placed.whatsappMessage}</pre>
        <p className="mt-4 text-lg font-semibold">Total {formatINR(placed.totalAmount)}</p>
        {formError && <p className="mt-3 text-sm text-red-600">{formError}</p>}
        <div className="mt-4">
          <WhatsAppButton onClick={reopen} loading={loading} label="Open WhatsApp again" />
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="page-wrap py-8">
        <EmptyState title="Nothing to order yet" body="Add crackers to the cart first." actionLabel="Browse crackers" actionTo="/products" />
      </div>
    );
  }

  return (
    <div className="page-wrap grid gap-6 py-8 lg:grid-cols-[1fr_0.85fr]">
      <section>
        <h1 className="font-display text-4xl">Your details</h1>
        <p className="mt-2 text-sm text-stone-600">We only use this to deliver the order and match it on WhatsApp.</p>
        <div className="mt-5">
          <CustomerForm
            values={values}
            errors={errors}
            onChange={(name, value) => setValues((current) => ({ ...current, [name]: value }))}
          />
        </div>
        {formError && <p className="mt-4 text-sm text-red-600">{formError}</p>}
      </section>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <OrderSummary
          items={cart.items}
          subtotal={cart.subtotal}
          discount={cart.discount}
          total={cart.total}
          note="A saved order is not a completed purchase until the shop confirms it."
        />
        <div className="mt-4">
          <WhatsAppButton onClick={submit} loading={loading} disabled={!settings.isOrderingOpen} />
        </div>
      </div>
    </div>
  );
}
