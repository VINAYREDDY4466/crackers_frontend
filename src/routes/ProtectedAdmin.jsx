import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedAdmin() {
  const { admin, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return <div className="grid min-h-screen place-items-center text-sm text-stone-500">Checking your session…</div>;
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
