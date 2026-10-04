import { useState } from 'react';

export default function ProductImage({ src, alt, className = '', fit = 'cover' }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200 ${className}`}>
        <svg viewBox="0 0 64 64" className="h-1/3 max-h-16 w-1/3 max-w-16" aria-hidden="true">
          <path d="M10 40c5 10 16 14 22 14s17-4 22-14c-7 3-14 4-22 4s-15-1-22-4z" fill="#EA580C" />
          <path d="M32 36c2-8 1-16 0-24 8 7 10 14 8 22-2 1-5 2-8 2z" fill="#F59E0B" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
    />
  );
}
