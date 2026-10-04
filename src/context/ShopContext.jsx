import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchSettings } from '../api/catalog';

const fallback = {
  shopName: 'Deepam Crackers',
  tagline: 'Choose your favourite crackers and place your order directly through WhatsApp.',
  marqueeEnabled: false,
  marqueeItems: [],
  whatsappGreeting: '',
  isOrderingOpen: true,
  contactPhone: '',
  email: '',
  address: '',
  about: 'Browse the catalog and send your order on WhatsApp. No account is required.',
  safetyNote: 'Light crackers in an open space, follow local rules, and keep children supervised by an adult.',
  whatsappNumber: '',
};

const ShopContext = createContext({ settings: fallback, loading: true });

export function ShopProvider({ children }) {
  const [settings, setSettings] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchSettings()
      .then((data) => {
        if (active) setSettings({ ...fallback, ...data });
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => ({ settings, loading }), [settings, loading]);
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  return useContext(ShopContext);
}
