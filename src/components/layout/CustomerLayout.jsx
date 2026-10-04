import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CartDrawer from '../cart/CartDrawer';
import BottomNav from './BottomNav';
import Footer from './Footer';
import Header from './Header';
import MarqueeBar from './MarqueeBar';
import WhatsAppFloat from './WhatsAppFloat';

export default function CustomerLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col pb-[calc(60px+env(safe-area-inset-bottom))] lg:pb-0">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <MarqueeBar />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <BottomNav />
      <WhatsAppFloat />
    </div>
  );
}
