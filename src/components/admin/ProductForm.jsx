import { useState } from 'react';
import ImageUploader from './ImageUploader';

const empty = {
  name: '',
  description: '',
  categoryId: '',
  ageGroup: 'family',
  unit: '',
  originalPrice: '',
  discountPercentage: 0,
  stockStatus: 'in_stock',
  stockQuantity: '',
  isActive: true,
};

export default function ProductForm({ initial, categories, onSubmit, saving }) {
  const [values, setValues] = useState({
    ...empty,
    ...initial,
    unit: initial?.unit ?? '',
    stockQuantity: initial?.stockQuantity ?? '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  function set(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    if (values.name.trim().length < 2) return setError('Enter a product name.');
    if (values.description.trim().length < 10) return setError('Add a description of at least 10 characters.');
    if (!values.categoryId) return setError('Choose a category.');
    const price = Number(values.originalPrice);
    if (!Number.isFinite(price) || price < 1) return setError('Enter a valid price.');
    const discount = Number(values.discountPercentage || 0);
    if (discount < 0 || discount > 90) return setError('Discount must be between 0 and 90.');
    setError('');
    onSubmit({
      ...values,
      unit: values.unit.trim(),
      originalPrice: price,
      discountPercentage: discount,
      stockQuantity: values.stockQuantity === '' ? null : Number(values.stockQuantity),
      file,
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-3xl bg-white p-5 ring-1 ring-orange-100">
      <label className="grid gap-1 text-sm">
        Name
        <input value={values.name} onChange={(event) => set('name', event.target.value)} className="min-h-11 rounded-2xl border border-orange-100 px-3" />
      </label>
      <label className="grid gap-1 text-sm">
        Description
        <textarea rows={4} value={values.description} onChange={(event) => set('description', event.target.value)} className="rounded-2xl border border-orange-100 px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm">
        Pack / unit
        <input maxLength={40} value={values.unit} onChange={(event) => set('unit', event.target.value)} placeholder="1 Box (10 pcs)" className="min-h-11 rounded-2xl border border-orange-100 px-3" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          Category
          <select value={values.categoryId} onChange={(event) => set('categoryId', event.target.value)} className="min-h-11 rounded-2xl border border-orange-100 px-3">
            <option value="">Select</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          Age group
          <select value={values.ageGroup} onChange={(event) => set('ageGroup', event.target.value)} className="min-h-11 rounded-2xl border border-orange-100 px-3">
            <option value="kids">Kids</option>
            <option value="family">Family</option>
            <option value="adults">Adults</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          Original price (₹)
          <input type="number" min="1" value={values.originalPrice} onChange={(event) => set('originalPrice', event.target.value)} className="min-h-11 rounded-2xl border border-orange-100 px-3" />
        </label>
        <label className="grid gap-1 text-sm">
          Discount %
          <input type="number" min="0" max="90" value={values.discountPercentage} onChange={(event) => set('discountPercentage', event.target.value)} className="min-h-11 rounded-2xl border border-orange-100 px-3" />
        </label>
        <label className="grid gap-1 text-sm">
          Availability
          <select value={values.stockStatus} onChange={(event) => set('stockStatus', event.target.value)} className="min-h-11 rounded-2xl border border-orange-100 px-3">
            <option value="in_stock">In stock</option>
            <option value="low_stock">Low stock</option>
            <option value="out_of_stock">Out of stock</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          Stock quantity
          <input type="number" min="0" value={values.stockQuantity} onChange={(event) => set('stockQuantity', event.target.value)} placeholder="Blank if not tracked" className="min-h-11 rounded-2xl border border-orange-100 px-3" />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" checked={values.isActive} onChange={(event) => set('isActive', event.target.checked)} />
        Visible in the shop
      </label>
      <ImageUploader currentUrl={initial?.imageUrl} onFile={setFile} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={saving} className="min-h-12 rounded-full bg-brand-700 font-semibold text-white">
        {saving ? 'Saving…' : 'Save product'}
      </button>
    </form>
  );
}
