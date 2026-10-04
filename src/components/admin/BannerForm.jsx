import { useState } from 'react';
import ImageUploader from './ImageUploader';

const empty = {
  title: '',
  subtitle: '',
  buttonLabel: '',
  linkUrl: '',
  imageUrl: '',
  displayOrder: 0,
  isActive: true,
};

const inputClass = 'min-h-11 rounded-2xl border border-orange-100 px-3';

function isSafeLink(value) {
  if (!value) return true;
  if (/^\/(?!\/)\S*$/.test(value)) return true;
  return /^https:\/\/\S+$/i.test(value);
}

function validate(values, file) {
  if (!values.imageUrl.trim() && !file) return 'Add an image link or upload an image.';
  if (values.imageUrl.trim() && !/^https:\/\/\S+$/i.test(values.imageUrl.trim())) return 'Image link must start with https://.';
  if (!isSafeLink(values.linkUrl.trim())) return 'Link must be a shop path like /offers or a full https:// link.';
  if (values.buttonLabel.trim() && !values.linkUrl.trim()) return 'Add a link for the button.';
  const order = Number(values.displayOrder);
  if (!Number.isInteger(order) || order < 0 || order > 999) return 'Display order must be between 0 and 999.';
  return '';
}

export default function BannerForm({ initial, onSubmit, saving }) {
  const [values, setValues] = useState({ ...empty, ...initial });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const set = (key) => (event) => setValues({ ...values, [key]: event.target.value });

  function submit(event) {
    event.preventDefault();
    const problem = validate(values, file);
    setError(problem);
    if (problem) return;
    onSubmit({
      title: values.title.trim(),
      subtitle: values.subtitle.trim(),
      buttonLabel: values.buttonLabel.trim(),
      linkUrl: values.linkUrl.trim(),
      imageUrl: values.imageUrl.trim(),
      displayOrder: Number(values.displayOrder),
      isActive: values.isActive,
      file,
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <label className="grid gap-1 text-sm">
        Title (optional)
        <input maxLength={90} value={values.title} onChange={set('title')} className={inputClass} />
      </label>
      <label className="grid gap-1 text-sm">
        Subtitle (optional)
        <textarea rows={2} maxLength={180} value={values.subtitle} onChange={set('subtitle')} className="rounded-2xl border border-orange-100 px-3 py-2" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          Button label
          <input maxLength={30} value={values.buttonLabel} onChange={set('buttonLabel')} placeholder="Shop offers" className={inputClass} />
        </label>
        <label className="grid gap-1 text-sm">
          Link
          <input maxLength={300} value={values.linkUrl} onChange={set('linkUrl')} placeholder="/offers" className={inputClass} />
        </label>
      </div>
      <label className="grid gap-1 text-sm">
        Image link
        <input maxLength={500} value={values.imageUrl} onChange={set('imageUrl')} placeholder="https://…" className={inputClass} />
      </label>
      <ImageUploader
        label="Or upload an image"
        currentUrl={values.imageUrl}
        onFile={setFile}
        hint="Recommended size 1600 × 700. Leave the title blank if the image already has text on it."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          Display order
          <input type="number" min="0" max="999" value={values.displayOrder} onChange={set('displayOrder')} className={inputClass} />
        </label>
        <label className="flex items-center gap-2 self-end pb-3 text-sm">
          <input type="checkbox" checked={values.isActive} onChange={(event) => setValues({ ...values, isActive: event.target.checked })} />
          Show on home page
        </label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={saving} className="min-h-11 rounded-full bg-brand-700 text-sm font-semibold text-white disabled:opacity-60">
        {saving ? 'Saving…' : 'Save banner'}
      </button>
    </form>
  );
}
