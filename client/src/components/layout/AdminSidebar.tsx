import React from 'react';
import { NavLink } from 'react-router-dom';

interface AdminSidebarProps {
  unreadMessagesCount?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  unreadMessagesCount = 0,
  isOpen,
  onClose
}) => {
  const navItems = [
    { to: '/admin/dashboard', icon: 'speedometer2', label: 'Dashboard' },
    { to: '/admin/profile', icon: 'person-badge', label: 'Profile' },
    { to: '/admin/about', icon: 'file-person', label: 'About Me' },
    { to: '/admin/skills', icon: 'code-square', label: 'Skills' },
    { to: '/admin/projects', icon: 'folder-check', label: 'Projects' },
    { to: '/admin/experience', icon: 'briefcase', label: 'Experience' },
    { to: '/admin/education', icon: 'mortarboard', label: 'Education' },
    { to: '/admin/services', icon: 'laptop', label: 'Services' },
    { to: '/admin/certifications', icon: 'award', label: 'Certifications' },
    { to: '/admin/achievements', icon: 'trophy', label: 'Achievements' },
    { to: '/admin/resume', icon: 'file-earmark-pdf', label: 'Resume' },
    { to: '/admin/social-links', icon: 'share', label: 'Social Links' },
    {
      to: '/admin/messages',
      icon: 'envelope',
      label: 'Messages',
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined
    },
    { to: '/admin/settings', icon: 'gear', label: 'Settings' }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 1040 }}
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`bg-body-tertiary border-end p-3 d-flex flex-column position-fixed position-lg-sticky top-0 start-0 h-100 ${
          isOpen ? 'translate-middle-x-0' : 'd-none d-lg-flex'
        }`}
        style={{
          width: '260px',
          zIndex: 1045,
          overflowY: 'auto',
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Brand header */}
        <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
          <NavLink to="/admin/dashboard" className="text-decoration-none d-flex align-items-center gap-2" onClick={onClose}>
            <span className="badge bg-primary rounded-3 p-2">
              <i className="bi bi-shield-lock fs-5"></i>
            </span>
            <div>
              <div className="fw-bold fs-6 text-body-emphasis lh-1">Portfolio CMS</div>
              <small className="text-body-secondary" style={{ fontSize: '0.72rem' }}>
                Admin Management
              </small>
            </div>
          </NavLink>
          <button className="btn btn-sm btn-outline-secondary d-lg-none border-0" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Navigation list */}
        <ul className="nav nav-pills flex-column gap-1 flex-grow-1">
          {navItems.map((item) => (
            <li key={item.to} className="nav-item">
              <NavLink
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center justify-content-between rounded-3 py-2 px-3 fw-medium ${
                    isActive ? 'active bg-primary text-white shadow-sm' : 'text-body-secondary'
                  }`
                }
              >
                <span className="d-flex align-items-center gap-2">
                  <i className={`bi bi-${item.icon} fs-5`}></i>
                  <span>{item.label}</span>
                </span>
                {item.badge !== undefined && (
                  <span className="badge bg-danger rounded-pill px-2">{item.badge}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Public site link */}
        <div className="pt-3 mt-auto border-top">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary btn-sm w-100 rounded-pill d-flex align-items-center justify-content-center gap-2"
          >
            <i className="bi bi-box-arrow-up-right"></i>
            <span>View Public Site</span>
          </a>
        </div>
      </aside>
    </>
  );
};
