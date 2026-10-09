import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertBanner } from '../../components/common/AlertBanner';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('admin@portfolio.com');
  const [password, setPassword] = useState<string>('admin123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-body-tertiary px-3">
      <div className="card border-0 shadow-lg portfolio-card p-4 p-md-5" style={{ maxWidth: '440px', width: '100%' }}>
        <div className="text-center mb-4">
          <div className="badge bg-primary rounded-4 p-3 mb-3">
            <i className="bi bi-shield-lock-fill fs-2"></i>
          </div>
          <h1 className="h3 fw-bold">Admin Portal</h1>
          <p className="text-body-secondary small mb-0">Sign in to manage your dynamic portfolio CMS</p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="alert alert-info py-2 px-3 small rounded-3 mb-3">
          <div className="fw-bold mb-1">
            <i className="bi bi-info-circle-fill me-1"></i> Default Credentials:
          </div>
          <div>Email: <code>admin@portfolio.com</code></div>
          <div>Password: <code>admin123</code></div>
        </div>

        <AlertBanner type="danger" message={error} onClose={() => setError(null)} />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-body border-end-0">
                <i className="bi bi-envelope text-body-secondary"></i>
              </span>
              <input
                type="email"
                className="form-control border-start-0"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portfolio.com"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-body border-end-0">
                <i className="bi bi-key text-body-secondary"></i>
              </span>
              <input
                type="password"
                className="form-control border-start-0"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill py-2 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status"></span>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <i className="bi bi-arrow-right"></i>
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-top">
          <Link to="/" className="text-decoration-none small text-body-secondary">
            <i className="bi bi-arrow-left me-1"></i> Return to Public Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};
