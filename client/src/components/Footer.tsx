import React from 'react';
import { Profile } from '../types';

interface FooterProps {
  profile: Profile | null;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const name = profile?.name || 'Alex Morgan';
  const github = profile?.github || 'https://github.com';
  const linkedin = profile?.linkedin || 'https://linkedin.com';
  const email = profile?.email || 'alex.morgan.dev@example.com';
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-5 border-top bg-body-tertiary">
      <div className="container">
        <div className="row gy-4 align-items-center justify-content-between">
          <div className="col-md-6 text-center text-md-start">
            <h5 className="fw-bold mb-1 d-flex align-items-center justify-content-center justify-content-md-start gap-2">
              <span className="badge bg-primary rounded-pill px-2 py-1 fs-6">
                <i className="bi bi-code-slash"></i>
              </span>
              <span>{name}</span>
            </h5>
            <p className="text-body-secondary small mb-2">
              Full-Stack Personal Portfolio • Built with React, TypeScript, Express & MongoDB
            </p>
            <div className="text-body-secondary small">
              © {currentYear} {name}. All rights reserved.
            </div>
          </div>

          <div className="col-md-6 d-flex flex-column align-items-center align-items-md-end gap-3">
            <div className="d-flex align-items-center gap-2">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '38px', height: '38px' }}
                aria-label="GitHub"
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '38px', height: '38px' }}
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href={`mailto:${email}`}
                className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '38px', height: '38px' }}
                aria-label="Email"
              >
                <i className="bi bi-envelope-fill"></i>
              </a>
              <button
                onClick={scrollToTop}
                className="btn btn-primary btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1 ms-2"
                title="Back to Top"
              >
                <i className="bi bi-arrow-up"></i>
                <span className="small">Top</span>
              </button>
            </div>
            <div className="small text-body-secondary">
              <a
                href="http://localhost:5000/api-docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-body-secondary"
              >
                Swagger API Docs <i className="bi bi-box-arrow-up-right small"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
