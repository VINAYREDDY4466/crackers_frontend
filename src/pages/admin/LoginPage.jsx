import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { errorMessage } from '../../api/client';
import DiyaMark from '../../components/ui/DiyaMark';
import { useAuth } from '../../context/AuthContext';
import { usePageTitle } from '../../hooks/useDebouncedValue';

export default function LoginPage() {
  const { admin, ready, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  usePageTitle('Admin login');

  if (ready && admin) return <Navigate to="/admin/dashboard" replace />;

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login({ email, password });
      navigate(location.state?.from || '/admin/dashboard', { replace: true });
    } catch (err) {
      setError(errorMessage(err, 'Login failed.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-cream px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-card ring-1 ring-orange-100">
        <DiyaMark />
        <h1 className="mt-3 font-display text-3xl">Admin login</h1>
        <p className="mt-1 text-sm text-stone-500">Customers never use this page.</p>
        <label className="mt-5 grid gap-1 text-sm">
          Email
          <input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-11 rounded-2xl border border-orange-100 px-3" required />
        </label>
        <label className="mt-3 grid gap-1 text-sm">
          Password
          <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="min-h-11 rounded-2xl border border-orange-100 px-3" required />
        </label>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="mt-5 min-h-12 w-full rounded-full bg-brand-700 font-semibold text-white">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
