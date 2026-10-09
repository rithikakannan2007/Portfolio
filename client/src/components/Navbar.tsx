import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  brandName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, brandName = 'Portfolio' }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const location = useLocation();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNav = () => setIsNavCollapsed(true);

  // Smooth scroll handler for anchor links
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      closeNav();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      closeNav();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-glass sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/" onClick={closeNav}>
          <span className="badge bg-primary rounded-pill px-2 py-1 fs-6">
            <i className="bi bi-code-slash"></i>
          </span>
          <span className="text-gradient">{brandName}</span>
        </Link>

        <div className="d-flex align-items-center gap-2 d-lg-none">
          <button
            className="btn btn-outline-secondary btn-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            <i className={`bi ${theme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'}`}></i>
          </button>
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <i className={`bi ${isNavCollapsed ? 'bi-list' : 'bi-x-lg'} fs-2`}></i>
          </button>
        </div>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#home" onClick={(e) => scrollToSection(e, 'home')}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#about" onClick={(e) => scrollToSection(e, 'about')}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#skills" onClick={(e) => scrollToSection(e, 'skills')}>
                Skills
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#experience" onClick={(e) => scrollToSection(e, 'experience')}>
                Experience
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#education" onClick={(e) => scrollToSection(e, 'education')}>
                Education
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>
                Contact
              </a>
            </li>

            {/* Swagger API Link */}
            <li className="nav-item ms-lg-2">
              <a
                href="http://localhost:5000/api-docs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-info rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1"
                title="View OpenAPI Swagger Documentation"
              >
                <i className="bi bi-file-earmark-code"></i>
                <span>API Docs</span>
              </a>
            </li>

            {/* Desktop Theme Toggle */}
            <li className="nav-item ms-lg-2 d-none d-lg-block">
              <button
                className="btn btn-outline-secondary btn-theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
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
