export const MAX_MARQUEE_ITEMS = 10;
export const MAX_MARQUEE_LENGTH = 160;

export function parseMarqueeText(text) {
  return text.split('\n').map((line) => line.trim()).filter(Boolean);
}

export function marqueeError(text) {
  const items = parseMarqueeText(text);
  if (items.length > MAX_MARQUEE_ITEMS) return `Use at most ${MAX_MARQUEE_ITEMS} scrolling messages.`;
  const longIndex = items.findIndex((item) => item.length > MAX_MARQUEE_LENGTH);
  if (longIndex >= 0) return `Message ${longIndex + 1} is longer than ${MAX_MARQUEE_LENGTH} characters.`;
  return '';
}

export default function MarqueeEditor({ enabled, text, onEnabledChange, onTextChange }) {
  const count = parseMarqueeText(text).length;
  const error = marqueeError(text);

  return (
    <fieldset className="grid gap-2 rounded-3xl bg-white p-4 ring-1 ring-orange-100">
      <legend className="px-1 text-sm font-semibold">Scrolling text bar</legend>
      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" checked={enabled} onChange={(event) => onEnabledChange(event.target.checked)} />
        Show the scrolling text at the top of the shop
      </label>
      <label className="grid gap-1 text-sm">
        Messages, one per line
        <textarea
          rows={5}
          value={text}
          onChange={(event) => onTextChange(event.target.value)}
          placeholder={'Diwali offer: up to 50% off\nOrders confirmed on WhatsApp'}
          className="rounded-2xl border border-orange-100 px-3 py-2"
        />
      </label>
      <p className={`text-xs ${error ? 'text-red-600' : 'text-stone-500'}`}>
        {error || `${count} of ${MAX_MARQUEE_ITEMS} messages. Each message can be up to ${MAX_MARQUEE_LENGTH} characters.`}
      </p>
    </fieldset>
  );
}
