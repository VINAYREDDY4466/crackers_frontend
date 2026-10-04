import { useLocation } from 'react-router-dom';
import { trackEvent } from '../../api/catalog';
import { useShop } from '../../context/ShopContext';
import { trackingMeta } from '../../utils/session';
import WhatsAppGlyph from '../ui/WhatsAppGlyph';

export default function WhatsAppFloat() {
  const { settings } = useShop();
  const { pathname } = useLocation();
  const number = (settings.whatsappNumber || '').replace(/\D/g, '');

  if (!number || pathname === '/order') return null;

  const message = settings.whatsappGreeting
    || `Hello ${settings.shopName}, I would like to know more about your crackers.`;
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() => trackEvent({ eventType: 'whatsapp_contact', page: pathname, ...trackingMeta() })}
      className="group fixed bottom-[calc(76px+env(safe-area-inset-bottom))] right-4 z-30 flex items-center gap-2 lg:bottom-6 lg:right-6"
    >
      <span className="hidden rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink shadow-soft ring-1 ring-black/5 lg:group-hover:inline-block">
        Chat with us
      </span>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-white transition group-hover:scale-105">
        <WhatsAppGlyph className="h-7 w-7" />
      </span>
    </a>
  );
}
