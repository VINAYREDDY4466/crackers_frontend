import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  createProduct,
  fetchAdminCategories,
  fetchAdminProduct,
  updateProduct,
  uploadProductImage,
} from '../../api/admin';
import { errorMessage } from '../../api/client';
import ProductForm from '../../components/admin/ProductForm';
import { LineSkeleton } from '../../components/ui/LoadingSkeleton';
import { useToast } from '../../context/ToastContext';
import { usePageTitle } from '../../hooks/useDebouncedValue';

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  usePageTitle(id ? 'Edit product' : 'New product');

  useEffect(() => {
    fetchAdminCategories().then(setCategories).catch(() => setError('Categories could not be loaded.'));
    if (!id) return;
    fetchAdminProduct(id).then(setProduct).catch(() => setError('Product not found.'));
  }, [id]);

  async function onSubmit(values) {
    const { file, ...payload } = values;
    setSaving(true);
    try {
      const saved = id ? await updateProduct(id, payload) : await createProduct(payload);
      if (file) {
        try {
          await uploadProductImage(saved.id, file);
        } catch (uploadError) {
          toast.error(errorMessage(uploadError, 'Product saved, but the image did not upload. Check S3 settings.'));
          navigate(`/admin/products/${saved.id}/edit`);
          return;
        }
      }
      toast.success('Product saved');
      navigate('/admin/products');
    } catch (err) {
      toast.error(errorMessage(err, 'Could not save the product.'));
    } finally {
      setSaving(false);
    }
  }

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (id && !product) return <LineSkeleton />;

  return (
    <div className="mx-auto grid max-w-3xl gap-4">
      <Link to="/admin/products" className="text-sm font-semibold text-brand-700">Back to products</Link>
      <h1 className="font-display text-4xl">{id ? 'Edit product' : 'New product'}</h1>
      <ProductForm
        categories={categories}
        saving={saving}
        initial={product ? { ...product, categoryId: product.category?.id || '' } : undefined}
        onSubmit={onSubmit}
      />
    </div>
  );
}
