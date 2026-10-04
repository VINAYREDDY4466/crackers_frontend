import { Link } from 'react-router-dom';

function BannerLink({ href, active, children }) {
  const shared = { className: 'block w-full shrink-0', 'aria-hidden': active ? undefined : 'true' };
  if (!href) return <div {...shared}>{children}</div>;

  const tabIndex = active ? 0 : -1;
  if (href.startsWith('/')) return <Link to={href} tabIndex={tabIndex} {...shared}>{children}</Link>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" tabIndex={tabIndex} {...shared}>
      {children}
    </a>
  );
}

export default function BannerSlide({ banner, active, eager }) {
  const hasText = Boolean(banner.title || banner.subtitle);

  return (
    <BannerLink href={banner.linkUrl} active={active}>
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/8]">
        <img
          src={banner.imageUrl}
          alt={banner.title || 'Diwali offer'}
          loading={eager ? 'eager' : 'lazy'}
          fetchpriority={eager ? 'high' : undefined}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {hasText && (
          <div className="absolute inset-0 flex items-center bg-gradient-to-r from-ink/80 via-ink/40 to-transparent">
            <div className="max-w-[80%] px-5 sm:max-w-xl sm:px-10 lg:px-14">
              {banner.title && (
                <h2 className="font-display text-2xl leading-tight text-white sm:text-4xl lg:text-5xl">{banner.title}</h2>
              )}
              {banner.subtitle && (
                <p className="mt-2 line-clamp-2 text-sm text-orange-50/90 sm:mt-3 sm:text-base">{banner.subtitle}</p>
              )}
              {banner.buttonLabel && (
                <span className="mt-4 inline-flex min-h-10 items-center rounded-full bg-brand-500 px-5 text-sm font-semibold text-white shadow-soft sm:mt-6 sm:min-h-12 sm:px-6">
                  {banner.buttonLabel}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </BannerLink>
  );
}
