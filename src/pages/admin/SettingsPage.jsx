import { useEffect, useState } from 'react';
import { fetchAdminSettings, saveSettings } from '../../api/admin';
import { errorMessage } from '../../api/client';
import MarqueeEditor, { marqueeError, parseMarqueeText } from '../../components/admin/MarqueeEditor';
import { useToast } from '../../context/ToastContext';
import { usePageTitle } from '../../hooks/useDebouncedValue';

const fields = [
  ['shopName', 'Shop name', 'text'],
  ['tagline', 'Tagline', 'text'],
  ['whatsappNumber', 'WhatsApp number with country code (for example 919876543210)', 'tel'],
  ['contactPhone', 'Contact phone shown publicly', 'text'],
  ['email', 'Email', 'email'],
  ['address', 'Address', 'text'],
];

const textareaClass = 'rounded-2xl border border-orange-100 px-3 py-2';

function toForm(settings) {
  return { ...settings, marqueeText: (settings.marqueeItems || []).join('\n') };
}

export default function SettingsPage() {
  const toast = useToast();
  const [form, setForm] = useState(null);
  const [storageConfigured, setStorageConfigured] = useState(false);
  const [saving, setSaving] = useState(false);
  usePageTitle('Settings');

  useEffect(() => {
    fetchAdminSettings().then((data) => {
      setForm(toForm(data.settings));
      setStorageConfigured(data.storageConfigured);
    }).catch(() => toast.error('Settings could not be loaded.'));
  }, [toast]);

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  async function submit(event) {
    event.preventDefault();
    const problem = marqueeError(form.marqueeText);
    if (problem) {
      toast.error(problem);
      return;
    }
    setSaving(true);
    try {
      const settings = await saveSettings({
        shopName: form.shopName,
        tagline: form.tagline,
        marqueeEnabled: Boolean(form.marqueeEnabled),
        marqueeItems: parseMarqueeText(form.marqueeText),
        whatsappGreeting: form.whatsappGreeting,
        isOrderingOpen: form.isOrderingOpen,
        whatsappNumber: form.whatsappNumber,
        contactPhone: form.contactPhone,
        email: form.email,
        address: form.address,
        about: form.about,
        safetyNote: form.safetyNote,
      });
      setForm(toForm(settings));
      toast.success('Settings saved. Shoppers see the changes on their next page load.');
    } catch (error) {
      toast.error(errorMessage(error, 'Could not save settings.'));
    } finally {
      setSaving(false);
    }
  }

  if (!form) return null;

  return (
    <form onSubmit={submit} className="mx-auto grid max-w-2xl gap-4">
      <h1 className="font-display text-4xl">Settings</h1>
      {!storageConfigured && (
        <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-950">
          S3 is not configured, so new image uploads will fail. Seeded catalog images still display.
        </p>
      )}
      {fields.map(([key, label, type]) => (
        <label key={key} className="grid gap-1 text-sm">
          {label}
          <input type={type} value={form[key] || ''} onChange={(event) => set(key, event.target.value)} className="min-h-11 rounded-2xl border border-orange-100 px-3" />
        </label>
      ))}
      <MarqueeEditor
        enabled={Boolean(form.marqueeEnabled)}
        text={form.marqueeText}
        onEnabledChange={(value) => set('marqueeEnabled', value)}
        onTextChange={(value) => set('marqueeText', value)}
      />
      <label className="grid gap-1 text-sm">
        WhatsApp chat greeting
        <textarea rows={2} maxLength={300} value={form.whatsappGreeting || ''} onChange={(event) => set('whatsappGreeting', event.target.value)} className={textareaClass} />
        <span className="text-xs text-stone-500">Prefilled message when a shopper taps the floating WhatsApp button.</span>
      </label>
      <label className="grid gap-1 text-sm">
        About
        <textarea rows={4} value={form.about || ''} onChange={(event) => set('about', event.target.value)} className={textareaClass} />
      </label>
      <label className="grid gap-1 text-sm">
        Safety note
        <textarea rows={3} value={form.safetyNote || ''} onChange={(event) => set('safetyNote', event.target.value)} className={textareaClass} />
      </label>
      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" checked={Boolean(form.isOrderingOpen)} onChange={(event) => set('isOrderingOpen', event.target.checked)} />
        Accept new WhatsApp orders
      </label>
      <button disabled={saving} className="min-h-12 rounded-full bg-brand-700 font-semibold text-white">{saving ? 'Saving…' : 'Save settings'}</button>
    </form>
  );
}
