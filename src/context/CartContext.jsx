import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { trackEvent } from '../api/catalog';
import { trackingMeta } from '../utils/session';

const CART_KEY = 'deepam_cart';
const CartContext = createContext(null);

function readCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function snapshot(product, quantity) {
  return {
    productId: product.id || product.productId,
    slug: product.slug,
    name: product.name,
    imageUrl: product.imageUrl || '',
    originalPrice: product.originalPrice,
    discountPercentage: product.discountPercentage || 0,
    finalPrice: product.finalPrice,
    stockStatus: product.stockStatus,
    ageGroup: product.ageGroup,
    unit: product.unit || '',
    categoryName: product.category?.name || product.categoryName || '',
    quantity,
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product, quantity = 1, { open = true } = {}) => {
    if (product.stockStatus === 'out_of_stock') return false;
    const qty = Math.min(50, Math.max(1, quantity));
    setItems((current) => {
      const existing = current.find((item) => item.productId === (product.id || product.productId));
      if (!existing) return [...current, snapshot(product, qty)];
      return current.map((item) => (
        item.productId === (product.id || product.productId)
          ? { ...snapshot(product, Math.min(50, item.quantity + qty)) }
          : item
      ));
    });
    if (open) setIsOpen(true);
    trackEvent({ eventType: 'add_to_cart', productId: product.id, quantity: qty, ...trackingMeta() });
    return true;
  }, []);

  const updateQty = useCallback((productId, quantity) => {
    const qty = Number(quantity);
    if (!qty || qty < 1) {
      setItems((current) => current.filter((item) => item.productId !== productId));
      return;
    }
    setItems((current) => current.map((item) => (
      item.productId === productId ? { ...item, quantity: Math.min(50, qty) } : item
    )));
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, discount: subtotal - total, total, count };
  }, [items]);

  const value = useMemo(() => ({
    items,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    updateQty,
    removeItem,
    clear,
    ...totals,
  }), [items, isOpen, addItem, updateQty, removeItem, clear, totals]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
