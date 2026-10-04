import { useState } from 'react';
import ImageUploader from './ImageUploader';

const empty = {
  name: '',
  description: '',
  ageGroup: 'all',
  displayOrder: 0,
  isActive: true,
};

export default function CategoryForm({ initial, onSubmit, saving }) {
  const [values, setValues] = useState({ ...empty, ...initial });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    if (!values.name || values.name.trim().length < 2) {
      setError('Enter a category name.');
      return;
    }
    setError('');
    onSubmit({ ...values, displayOrder: Number(values.displayOrder) || 0, file });
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <label className="grid gap-1 text-sm">
        Name
        <input value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} className="min-h-11 rounded-2xl border border-orange-100 px-3" />
      </label>
      <label className="grid gap-1 text-sm">
        Description
        <textarea rows={3} value={values.description} onChange={(event) => setValues({ ...values, description: event.target.value })} className="rounded-2xl border border-orange-100 px-3 py-2" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          Age hint
          <select value={values.ageGroup} onChange={(event) => setValues({ ...values, ageGroup: event.target.value })} className="min-h-11 rounded-2xl border border-orange-100 px-3">
            <option value="all">All</option>
            <option value="kids">Kids</option>
            <option value="family">Family</option>
            <option value="adults">Adults</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          Display order
          <input type="number" min="0" value={values.displayOrder} onChange={(event) => setValues({ ...values, displayOrder: event.target.value })} className="min-h-11 rounded-2xl border border-orange-100 px-3" />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={values.isActive} onChange={(event) => setValues({ ...values, isActive: event.target.checked })} />
        Active
      </label>
      <ImageUploader currentUrl={initial?.imageUrl} onFile={setFile} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={saving} className="min-h-11 rounded-full bg-brand-700 text-sm font-semibold text-white">
        {saving ? 'Saving…' : 'Save category'}
      </button>
    </form>
  );
}
