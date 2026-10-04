import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon';
import BannerSlide from './BannerSlide';

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 40;

export default function BannerCarousel({ banners }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);
  const count = banners.length;

  const go = useCallback((next) => setIndex((next + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [count, paused]);

  function onTouchEnd(event) {
    if (touchStart.current == null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) go(index + (delta < 0 ? 1 : -1));
    touchStart.current = null;
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Diwali offers"
      className="page-wrap pt-4 sm:pt-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative overflow-hidden rounded-2xl bg-orange-100 shadow-card sm:rounded-3xl">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {banners.map((banner, position) => (
            <BannerSlide key={banner.id} banner={banner} active={position === index} eager={position === 0} />
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous banner"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-soft hover:bg-white sm:flex"
            >
              <Icon name="chevronLeft" />
            </button>
            <button
              type="button"
              aria-label="Next banner"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-soft hover:bg-white sm:flex"
            >
              <Icon name="chevronRight" />
            </button>
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {banners.map((banner, position) => (
                <button
                  key={banner.id}
                  type="button"
                  aria-label={`Show banner ${position + 1}`}
                  aria-current={position === index ? 'true' : undefined}
                  onClick={() => go(position)}
                  className={`h-2 rounded-full transition-all ${position === index ? 'w-6 bg-white' : 'w-2 bg-white/60'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
