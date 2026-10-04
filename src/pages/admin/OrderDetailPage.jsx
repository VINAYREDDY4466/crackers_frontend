import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchAdminOrder, updateOrderStatus, updatePaymentStatus } from '../../api/admin';
import { errorMessage } from '../../api/client';
import OrderDetails from '../../components/admin/OrderDetails';
import { LineSkeleton } from '../../components/ui/LoadingSkeleton';
import { useToast } from '../../context/ToastContext';
import { usePageTitle } from '../../hooks/useDebouncedValue';

export default function OrderDetailPage() {
  const { id } = useParams();
  const toast = useToast();
  const [order, setOrder] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  usePageTitle(order?.orderNumber || 'Order');

  useEffect(() => {
    fetchAdminOrder(id).then(setOrder).catch(() => setError('Order not found.'));
  }, [id]);

  async function save(event, updater, payload) {
    event.preventDefault();
    setSaving(true);
    try {
      setOrder(await updater(id, payload));
      toast.success('Order updated');
    } catch (err) {
      toast.error(errorMessage(err, 'Could not update the order.'));
    } finally {
      setSaving(false);
    }
  }

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!order) return <LineSkeleton />;

  return (
    <div className="grid gap-4">
      <Link to="/admin/orders" className="text-sm font-semibold text-brand-700">Back to orders</Link>
      <OrderDetails
        order={order}
        saving={saving}
        onStatus={(event) => save(event, updateOrderStatus, {
          orderStatus: event.target.orderStatus.value,
          note: event.target.note.value,
        })}
        onPayment={(event) => save(event, updatePaymentStatus, {
          paymentStatus: event.target.paymentStatus.value,
        })}
      />
    </div>
  );
}
