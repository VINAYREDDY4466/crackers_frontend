import { useCallback, useEffect, useState } from 'react';
import { createBanner, deleteBanner, fetchAdminBanners, updateBanner, uploadBannerImage } from '../../api/admin';
import { errorMessage } from '../../api/client';
import BannerForm from '../../components/admin/BannerForm';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import { usePageTitle } from '../../hooks/useDebouncedValue';

export default function BannersAdminPage() {
  const toast = useToast();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  usePageTitle('Banners');

  const load = useCallback(() => {
    fetchAdminBanners()
      .then(setBanners)
      .catch(() => toast.error('Banners could not be loaded.'))
      .finally(() => setLoading(false));
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  async function save({ file, ...payload }) {
    const existing = editing?.id ? editing : null;
    setSaving(true);
    let saved;
    try {
      saved = existing ? await updateBanner(existing.id, payload) : await createBanner(payload);
    } catch (error) {
      toast.error(errorMessage(error, 'Could not save the banner.'));
      setSaving(false);
      return;
    }

    try {
      if (file) await uploadBannerImage(saved.id, file);
      toast.success('Banner saved');
    } catch (error) {
      const hidden = !saved.imageUrl ? ' The banner stays hidden until it has an image.' : '';
      toast.error(`${errorMessage(error, 'Image upload failed.')}${hidden}`);
    } finally {
      setSaving(false);
      setEditing(null);
      load();
    }
  }

  async function toggle(banner) {
    try {
      await updateBanner(banner.id, { isActive: !banner.isActive });
      load();
    } catch (error) {
      toast.error(errorMessage(error, 'Could not update the banner.'));
    }
  }

  async function remove(banner) {
    if (!window.confirm(`Delete the banner "${banner.title || 'Untitled'}"?`)) return;
    try {
      await deleteBanner(banner.id);
      toast.success('Banner deleted');
      load();
    } catch (error) {
      toast.error(errorMessage(error, 'Could not delete the banner.'));
    }
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl">Banners</h1>
          <p className="text-sm text-stone-500">Slides on the home page, shown in display order. Up to 8 active banners are shown.</p>
        </div>
        <button type="button" onClick={() => setEditing({})} className="min-h-11 rounded-full bg-brand-700 px-4 text-sm font-semibold text-white">
          New banner
        </button>
      </div>

      {!loading && banners.length === 0 && (
        <p className="rounded-3xl bg-white p-6 text-sm text-stone-500 ring-1 ring-orange-100">
          No banners yet. The home page shows the default welcome section until you add one.
        </p>
      )}

      <div className="grid gap-3">
        {banners.map((banner) => (
          <article key={banner.id} className="flex flex-col gap-3 rounded-3xl bg-white p-3 ring-1 ring-orange-100 sm:flex-row sm:items-center">
            {banner.imageUrl ? (
              <img src={banner.imageUrl} alt="" className="aspect-[21/8] w-full rounded-2xl object-cover sm:w-56" />
            ) : (
              <div className="flex aspect-[21/8] w-full items-center justify-center rounded-2xl bg-orange-50 text-xs text-stone-500 sm:w-56">No image</div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{banner.title || 'Untitled banner'}</p>
              <p className="text-sm text-stone-500">
                Order {banner.displayOrder} · {banner.isActive && banner.imageUrl ? 'Live' : 'Hidden'}
                {banner.linkUrl && ` · ${banner.linkUrl}`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => toggle(banner)} className="min-h-10 rounded-full bg-orange-50 px-3 text-sm font-semibold text-brand-700">
                {banner.isActive ? 'Hide' : 'Show'}
              </button>
              <button type="button" onClick={() => setEditing(banner)} className="min-h-10 rounded-full bg-orange-50 px-3 text-sm font-semibold text-brand-700">Edit</button>
              <button type="button" onClick={() => remove(banner)} className="min-h-10 px-3 text-sm text-red-600">Delete</button>
            </div>
          </article>
        ))}
      </div>

      {editing && (
        <Modal title={editing.id ? 'Edit banner' : 'New banner'} onClose={() => setEditing(null)}>
          <BannerForm initial={editing} saving={saving} onSubmit={save} />
        </Modal>
      )}
    </div>
  );
}
