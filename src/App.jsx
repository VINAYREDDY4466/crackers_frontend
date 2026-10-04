import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import CustomerLayout from './components/layout/CustomerLayout';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CategoriesPage from './pages/CategoriesPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import OrderPage from './pages/OrderPage';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';
import ProtectedAdmin from './routes/ProtectedAdmin';

const AnalyticsPage = lazy(() => import('./pages/admin/AnalyticsPage'));
const BannersAdminPage = lazy(() => import('./pages/admin/BannersAdminPage'));
const CategoriesAdminPage = lazy(() => import('./pages/admin/CategoriesAdminPage'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const OrderDetailPage = lazy(() => import('./pages/admin/OrderDetailPage'));
const OrdersAdminPage = lazy(() => import('./pages/admin/OrdersAdminPage'));
const ProductEditPage = lazy(() => import('./pages/admin/ProductEditPage'));
const ProductsAdminPage = lazy(() => import('./pages/admin/ProductsAdminPage'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));

function AdminFallback() {
  return <div className="grid min-h-screen place-items-center text-sm text-stone-500">Loading admin…</div>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route index element={<HomePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:slug" element={<ProductsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:slug" element={<ProductPage />} />
        <Route path="offers" element={<ProductsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="admin/login" element={<Suspense fallback={<AdminFallback />}><LoginPage /></Suspense>} />
      <Route path="admin" element={<ProtectedAdmin />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="orders" element={<OrdersAdminPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="products" element={<ProductsAdminPage />} />
          <Route path="products/new" element={<ProductEditPage />} />
          <Route path="products/:id/edit" element={<ProductEditPage />} />
          <Route path="categories" element={<CategoriesAdminPage />} />
          <Route path="banners" element={<BannersAdminPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
