import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SocialLink, PortfolioSettings, Profile } from '../../types';
import { socialLinkService, settingsService, profileService } from '../../services/api';

export const PublicFooter: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [settings, setSettings] = useState<PortfolioSettings | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const [links, siteSettings, prof] = await Promise.all([
          socialLinkService.getAll(),
          settingsService.get(),
          profileService.get()
        ]);
        setSocialLinks(links);
        setSettings(siteSettings);
        setProfile(prof);
      } catch (err) {
        console.warn('Failed to load footer dynamic data:', err);
      }
    };
    loadFooterData();
  }, []);

  const currentYear = new Date().getFullYear();
  const name = profile?.name || 'Alex Morgan';

  return (
    <footer className="py-5 border-top bg-body-tertiary mt-auto">
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
              {settings?.customFooterText || 'Built with React, TypeScript, Express & MongoDB • Fully Dynamic CMS'}
            </p>
            <div className="text-body-secondary small">
              © {currentYear} {name}. All rights reserved. •{' '}
              <Link to="/admin/login" className="text-decoration-none text-muted">
                Admin Access
              </Link>
            </div>
          </div>

          <div className="col-md-6 d-flex flex-column align-items-center align-items-md-end gap-3">
            <div className="d-flex flex-wrap align-items-center gap-2 justify-content-center">
              {socialLinks.map((link) => (
                <a
                  key={link._id || link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px' }}
                  aria-label={link.platform}
                  title={link.platform}
                >
                  <i className={`bi bi-${link.icon || 'globe'}`}></i>
                </a>
              ))}

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn btn-primary btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1 ms-2"
                title="Back to Top"
              >
                <i className="bi bi-arrow-up"></i>
                <span className="small">Top</span>
              </button>
            </div>

            <div className="small text-body-secondary d-flex gap-3">
              <a
                href="http://localhost:5000/api-docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-body-secondary"
              >
                Swagger API Docs <i className="bi bi-box-arrow-up-right small"></i>
              </a>
              <span>•</span>
              <a
                href="http://localhost:5000/api/health"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-body-secondary"
              >
                API Health Check
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
