import { useShop } from '../context/ShopContext';
import { usePageTitle } from '../hooks/useDebouncedValue';

export default function ContactPage() {
  const { settings } = useShop();
  usePageTitle('Contact');
  const digits = (settings.whatsappNumber || '').replace(/\D/g, '');
  const chatUrl = digits ? `https://wa.me/${digits}?text=${encodeURIComponent(`Hello ${settings.shopName}, I have a question.`)}` : '';

  return (
    <div className="page-wrap max-w-3xl py-10">
      <h1 className="font-display text-4xl">Contact</h1>
      <p className="mt-3 text-sm leading-6 text-stone-600">For a product order, use the cart. This page is only for a general question.</p>
      <div className="mt-6 grid gap-3 rounded-3xl bg-white p-5 ring-1 ring-orange-100">
        {settings.address && <p><span className="font-semibold">Address. </span>{settings.address}</p>}
        {settings.contactPhone && <p><span className="font-semibold">Phone. </span>{settings.contactPhone}</p>}
        {settings.email && <p><span className="font-semibold">Email. </span>{settings.email}</p>}
        <p className="text-sm leading-6 text-stone-600">{settings.safetyNote}</p>
        {chatUrl && (
          <a href={chatUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-700 px-5 text-sm font-semibold text-white">
            Chat on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
