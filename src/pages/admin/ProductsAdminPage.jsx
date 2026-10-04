import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchAdminProducts, updateAvailability } from '../../api/admin';
import { errorMessage } from '../../api/client';
import Modal from '../../components/ui/Modal';
import Pagination from '../../components/ui/Pagination';
import { useToast } from '../../context/ToastContext';
import { useDebouncedValue, usePageTitle } from '../../hooks/useDebouncedValue';
import { STOCK_LABELS } from '../../utils/labels';
import { formatINR } from '../../utils/money';

export default function ProductsAdminPage() {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const debounced = useDebouncedValue(search);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ items: [], meta: { page: 1, totalPages: 1 } });
  const [pendingDelete, setPendingDelete] = useState(null);
  usePageTitle('Products');

  function load() {
    fetchAdminProducts({ search: debounced || undefined, page, limit: 12 })
      .then(setResult)
      .catch(() => toast.error('Products could not be loaded.'));
  }

  useEffect(() => {
    setPage(1);
  }, [debounced]);

  useEffect(() => {
    load();
    // load is recreated each render; the inputs below are the real dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, page]);

  async function toggle(product) {
    try {
      await updateAvailability(product.id, { isActive: !product.isActive });
      load();
    } catch (error) {
      toast.error(errorMessage(error, 'Could not update the product.'));
    }
  }

  async function confirmDelete() {
    try {
      await deleteProduct(pendingDelete.id);
      setPendingDelete(null);
      toast.success('Product deleted');
      load();
    } catch (error) {
      toast.error(errorMessage(error, 'Could not delete the product.'));
    }
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl">Products</h1>
        <Link to="/admin/products/new" className="inline-flex min-h-11 items-center rounded-full bg-brand-700 px-4 text-sm font-semibold text-white">New product</Link>
      </div>
      <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" className="min-h-11 max-w-md rounded-2xl border border-orange-100 px-3" />
      <div className="grid gap-3">
        {result.items.map((product) => (
          <article key={product.id} className="flex flex-col gap-3 rounded-3xl bg-white p-4 ring-1 ring-orange-100 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-stone-500">
                {product.category?.name || 'No category'} · {formatINR(product.finalPrice)} · {STOCK_LABELS[product.stockStatus]} · {product.isActive ? 'Visible' : 'Hidden'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => toggle(product)} className="min-h-10 rounded-full border border-orange-200 px-3 text-sm">{product.isActive ? 'Disable' : 'Enable'}</button>
              <Link to={`/admin/products/${product.id}/edit`} className="inline-flex min-h-10 items-center rounded-full bg-orange-50 px-3 text-sm font-semibold text-brand-700">Edit</Link>
              <button type="button" onClick={() => setPendingDelete(product)} className="min-h-10 rounded-full px-3 text-sm text-red-600">Delete</button>
            </div>
          </article>
        ))}
        {result.items.length === 0 && <p className="text-sm text-stone-500">No products found.</p>}
      </div>
      <Pagination page={result.meta.page} totalPages={result.meta.totalPages} onPage={setPage} />
      {pendingDelete && (
        <Modal title="Delete product" onClose={() => setPendingDelete(null)}>
          <p className="text-sm text-stone-600">Delete {pendingDelete.name}? Past orders keep their own copy of the name and price.</p>
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={() => setPendingDelete(null)} className="min-h-11 rounded-full px-4 text-sm">Cancel</button>
            <button type="button" onClick={confirmDelete} className="min-h-11 rounded-full bg-red-600 px-4 text-sm font-semibold text-white">Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
