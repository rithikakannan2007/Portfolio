import React from 'react';
import { useAuth } from '../../context/AuthContext';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleSidebar,
  theme,
  toggleTheme
}) => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar navbar-glass sticky-top py-2 px-3 px-lg-4 border-bottom d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-sm btn-outline-secondary d-lg-none"
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list fs-5"></i>
        </button>
        <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-2 py-1 rounded-pill small">
          <i className="bi bi-shield-check me-1"></i> Admin Console
        </span>
      </div>

      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-outline-secondary btn-theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          <i className={`bi ${theme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'}`}></i>
        </button>

        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
            style={{ width: '36px', height: '36px', fontSize: '0.85rem' }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="d-none d-sm-block text-start">
            <div className="small fw-bold lh-1 text-body-emphasis">{user?.name || 'Administrator'}</div>
            <div className="text-body-secondary" style={{ fontSize: '0.72rem' }}>
              {user?.email || 'admin@portfolio.com'}
            </div>
          </div>
        </div>

        <button
          className="btn btn-outline-danger btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1"
          onClick={logout}
          title="Logout from admin session"
        >
          <i className="bi bi-box-arrow-right"></i>
          <span className="d-none d-sm-inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
