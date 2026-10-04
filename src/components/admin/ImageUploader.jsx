import { useEffect, useState } from 'react';

const types = ['image/jpeg', 'image/png', 'image/webp'];

export default function ImageUploader({ label = 'Image', currentUrl, onFile, hint }) {
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  function choose(file) {
    setError('');
    if (!file) {
      setPreview('');
      onFile(null);
      return;
    }
    if (!types.includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError('Use a JPG, PNG, or WEBP under 5 MB.');
      setPreview('');
      onFile(null);
      return;
    }
    setPreview(URL.createObjectURL(file));
    onFile(file);
  }

  const shown = preview || currentUrl;

  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      {shown && <img src={shown} alt="" className="h-36 w-full rounded-2xl object-cover" />}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) => choose(event.target.files?.[0] || null)}
        className="text-sm"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <p className="text-xs text-stone-500">{hint || 'Images are uploaded to S3. They are not kept on the API server.'}</p>
    </div>
  );
}
