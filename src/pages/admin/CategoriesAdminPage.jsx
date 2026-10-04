import { useEffect, useState } from 'react';
import {
  createCategory,
  deleteCategory,
  fetchAdminCategories,
  updateCategory,
  uploadCategoryImage,
} from '../../api/admin';
import { errorMessage } from '../../api/client';
import CategoryForm from '../../components/admin/CategoryForm';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import { invalidateCategories } from '../../hooks/useCategories';
import { usePageTitle } from '../../hooks/useDebouncedValue';

export default function CategoriesAdminPage() {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  usePageTitle('Categories');

  function load() {
    invalidateCategories();
    fetchAdminCategories().then(setCategories).catch(() => toast.error('Categories could not be loaded.'));
  }

  useEffect(() => {
    load();
  }, []);

  async function save(values, existing) {
    const { file, ...payload } = values;
    setSaving(true);
    try {
      const saved = existing ? await updateCategory(existing.id, payload) : await createCategory(payload);
      if (file) await uploadCategoryImage(saved.id, file);
      toast.success('Category saved');
      setEditing(null);
      setCreating(false);
      load();
    } catch (error) {
      toast.error(errorMessage(error, 'Could not save the category. Image upload needs S3.'));
    } finally {
      setSaving(false);
    }
  }

  async function remove(category) {
    if (!window.confirm(`Delete ${category.name}?`)) return;
    try {
      await deleteCategory(category.id);
      toast.success('Category deleted');
      load();
    } catch (error) {
      toast.error(errorMessage(error, 'Could not delete the category.'));
    }
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-4xl">Categories</h1>
        <button type="button" onClick={() => setCreating(true)} className="min-h-11 rounded-full bg-brand-700 px-4 text-sm font-semibold text-white">New category</button>
      </div>
      <div className="grid gap-3">
        {categories.map((category) => (
          <article key={category.id} className="flex flex-col gap-3 rounded-3xl bg-white p-4 ring-1 ring-orange-100 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{category.name}</p>
              <p className="text-sm text-stone-500">Order {category.displayOrder} · {category.productCount} products · {category.isActive ? 'Active' : 'Hidden'}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setEditing(category)} className="min-h-10 rounded-full bg-orange-50 px-3 text-sm font-semibold text-brand-700">Edit</button>
              <button type="button" onClick={() => remove(category)} className="min-h-10 px-3 text-sm text-red-600">Delete</button>
            </div>
          </article>
        ))}
      </div>
      {creating && (
        <Modal title="New category" onClose={() => setCreating(false)}>
          <CategoryForm saving={saving} onSubmit={(values) => save(values)} />
        </Modal>
      )}
      {editing && (
        <Modal title="Edit category" onClose={() => setEditing(null)}>
          <CategoryForm initial={editing} saving={saving} onSubmit={(values) => save(values, editing)} />
        </Modal>
      )}
    </div>
  );
}
