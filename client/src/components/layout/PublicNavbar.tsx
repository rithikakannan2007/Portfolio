import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PublicNavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  brandName?: string;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  theme,
  toggleTheme,
  brandName = 'Portfolio'
}) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const { isAuthenticated } = useAuth();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNav = () => setIsNavCollapsed(true);

  return (
    <nav className="navbar navbar-expand-xl navbar-glass sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/" onClick={closeNav}>
          <span className="badge bg-primary rounded-pill px-2 py-1 fs-6">
            <i className="bi bi-code-slash"></i>
          </span>
          <span className="text-gradient">{brandName}</span>
        </Link>

        {/* Mobile Action Controls */}
        <div className="d-flex align-items-center gap-2 d-xl-none">
          <button
            className="btn btn-outline-secondary btn-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <i className={`bi ${theme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'}`}></i>
          </button>
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            aria-controls="publicNavbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <i className={`bi ${isNavCollapsed ? 'bi-list' : 'bi-x-lg'} fs-2`}></i>
          </button>
        </div>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="publicNavbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-xl-0 align-items-xl-center gap-xl-1">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium ${isActive ? 'active text-primary fw-bold' : ''}`} to="/" end onClick={closeNav}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium ${isActive ? 'active text-primary fw-bold' : ''}`} to="/about" onClick={closeNav}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium ${isActive ? 'active text-primary fw-bold' : ''}`} to="/skills" onClick={closeNav}>
                Skills
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium ${isActive ? 'active text-primary fw-bold' : ''}`} to="/projects" onClick={closeNav}>
                Projects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium ${isActive ? 'active text-primary fw-bold' : ''}`} to="/experience" onClick={closeNav}>
                Experience
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium ${isActive ? 'active text-primary fw-bold' : ''}`} to="/education" onClick={closeNav}>
                Education
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium ${isActive ? 'active text-primary fw-bold' : ''}`} to="/services" onClick={closeNav}>
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium ${isActive ? 'active text-primary fw-bold' : ''}`} to="/certifications" onClick={closeNav}>
                Certs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium ${isActive ? 'active text-primary fw-bold' : ''}`} to="/achievements" onClick={closeNav}>
                Awards
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium ${isActive ? 'active text-primary fw-bold' : ''}`} to="/resume" onClick={closeNav}>
                Resume
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium ${isActive ? 'active text-primary fw-bold' : ''}`} to="/contact" onClick={closeNav}>
                Contact
              </NavLink>
            </li>

            {/* Swagger API Link */}
            <li className="nav-item ms-xl-2">
              <a
                href="http://localhost:5000/api-docs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-info rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1"
                title="Swagger API Documentation"
              >
                <i className="bi bi-file-earmark-code"></i>
                <span>Swagger</span>
              </a>
            </li>

            {/* Admin Portal Shortcut */}
            <li className="nav-item ms-xl-2">
              <Link
                to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
                className="btn btn-sm btn-primary rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 shadow-sm"
                onClick={closeNav}
              >
                <i className="bi bi-shield-lock-fill"></i>
                <span>{isAuthenticated ? 'Dashboard' : 'Admin'}</span>
              </Link>
            </li>

            {/* Desktop Theme Toggle */}
            <li className="nav-item ms-xl-2 d-none d-xl-block">
              <button
                className="btn btn-outline-secondary btn-theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <i className={`bi ${theme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'}`}></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
