export const AGE_LABELS = {
  kids: 'Kids',
  family: 'Family',
  adults: 'Adults',
};

export const AGE_STYLES = {
  kids: 'bg-sky-50 text-sky-700',
  family: 'bg-amber-50 text-amber-800',
  adults: 'bg-red-50 text-red-700',
};

export const STOCK_LABELS = {
  in_stock: 'In stock',
  low_stock: 'Low stock',
  out_of_stock: 'Out of stock',
};

export const ORDER_STATUS_LABELS = {
  whatsapp_redirected: 'WhatsApp Redirected',
  order_received: 'Order Received',
  payment_pending: 'Payment Pending',
  payment_failed: 'Payment Failed',
  payment_received: 'Payment Received',
  order_confirmed: 'Order Confirmed',
  processing: 'Processing',
  ready: 'Ready',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  not_ordered: 'Not Ordered',
};

export const PAYMENT_STATUS_LABELS = {
  pending: 'Payment Pending',
  failed: 'Payment Failed',
  received: 'Payment Received',
};

const BADGE_STYLES = {
  whatsapp_redirected: 'bg-orange-100 text-brand-800',
  order_received: 'bg-amber-100 text-amber-800',
  payment_pending: 'bg-amber-100 text-amber-800',
  payment_failed: 'bg-red-100 text-red-700',
  payment_received: 'bg-green-100 text-green-700',
  order_confirmed: 'bg-sky-100 text-sky-800',
  processing: 'bg-sky-100 text-sky-800',
  ready: 'bg-emerald-100 text-emerald-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-stone-200 text-stone-700',
  not_ordered: 'bg-stone-100 text-stone-600',
  pending: 'bg-amber-100 text-amber-800',
  failed: 'bg-red-100 text-red-700',
  received: 'bg-green-100 text-green-700',
};

export function badgeClass(status) {
  return BADGE_STYLES[status] || 'bg-stone-100 text-stone-700';
}

export function statusLabel(status) {
  return ORDER_STATUS_LABELS[status] || PAYMENT_STATUS_LABELS[status] || status;
}
