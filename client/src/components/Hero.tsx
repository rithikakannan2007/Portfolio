import React from 'react';
import { Profile } from '../types';

interface HeroProps {
  profile: Profile | null;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const name = profile?.name || 'Alex Morgan';
  const title = profile?.title || 'Full-Stack Developer';
  const bio =
    profile?.bio ||
    'A passionate Full-Stack Developer who enjoys building modern and user-friendly web applications.';
  const profileImage =
    profile?.profileImage ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
  const github = profile?.github || 'https://github.com';
  const linkedin = profile?.linkedin || 'https://linkedin.com';
  const email = profile?.email || 'alex.morgan.dev@example.com';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section py-5">
      <div className="container py-lg-4">
        <div className="row align-items-center flex-column-reverse flex-lg-row gy-5">
          <div className="col-lg-7">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25">
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              <span className="small fw-semibold">Available for full-time & freelance projects</span>
            </div>

            <h1 className="display-4 fw-extrabold mb-3 lh-tight">
              Hi, I'm <span className="text-gradient">{name}</span>
            </h1>

            <h2 className="h3 text-secondary fw-semibold mb-3">
              {title}
            </h2>

            <p className="lead text-body-secondary mb-4 col-xl-10 fs-5 lh-base">
              {bio}
            </p>

            <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
              <button
                className="btn btn-primary btn-lg rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm"
                onClick={() => scrollTo('projects')}
              >
                <span>View My Work</span>
                <i className="bi bi-arrow-right"></i>
              </button>
              <button
                className="btn btn-outline-secondary btn-lg rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2"
                onClick={() => scrollTo('contact')}
              >
                <span>Contact Me</span>
                <i className="bi bi-envelope"></i>
              </button>
            </div>

            {/* Social Media Links */}
            <div className="d-flex align-items-center gap-3 pt-2">
              <span className="small text-body-secondary fw-medium">Connect:</span>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '38px', height: '38px' }}
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <i className="bi bi-github fs-5"></i>
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '38px', height: '38px' }}
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a
                href={`mailto:${email}`}
                className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '38px', height: '38px' }}
                aria-label="Send Email"
                title="Email"
              >
                <i className="bi bi-envelope-fill fs-5"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-5 text-center">
            <div className="hero-avatar-wrapper">
              <img
                src={profileImage}
                alt={name}
                className="hero-avatar img-fluid"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
