import React from 'react';
import { Profile } from '../types';

interface AboutProps {
  profile: Profile | null;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const name = profile?.name || 'Alex Morgan';
  const bio = profile?.bio || 'Full-Stack Developer passionate about clean code and scalable architectures.';
  const location = profile?.location || 'San Francisco, CA';
  const email = profile?.email || 'alex.morgan.dev@example.com';
  const phone = profile?.phone || '+1 (555) 382-9104';

  return (
    <section id="about" className="py-5 bg-body-tertiary">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Get To Know Me
          </span>
          <h2 className="display-6 fw-bold">About Me</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '600px' }}>
            Transforming complex business logic into intuitive, performant, and elegant digital experiences.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Personal Introduction Card */}
          <div className="col-lg-6">
            <div className="card h-100 border-0 shadow-sm portfolio-card p-4">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="badge bg-primary-subtle text-primary p-3 rounded-4 fs-4">
                    <i className="bi bi-person-lines-fill"></i>
                  </div>
                  <div>
                    <h3 className="h4 fw-bold mb-0">Personal Background</h3>
                    <small className="text-body-secondary">Who I am & what drives me</small>
                  </div>
                </div>

                <p className="text-body-secondary lh-base mb-4">
                  Hello! I'm <strong className="text-body-emphasis">{name}</strong>. I specialize in full-stack JavaScript and TypeScript ecosystems, focusing on building resilient APIs and interactive, accessible user interfaces. I believe good software strikes the perfect balance between architectural rigor and an effortless user experience.
                </p>

                <p className="text-body-secondary lh-base mb-4">
                  {bio}
                </p>

                <div className="row g-3 pt-2 border-top">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-geo-alt text-primary fs-5"></i>
                      <div>
                        <div className="small text-body-secondary">Location</div>
                        <div className="fw-semibold small">{location}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-envelope text-primary fs-5"></i>
                      <div>
                        <div className="small text-body-secondary">Email</div>
                        <div className="fw-semibold small text-truncate">{email}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-telephone text-primary fs-5"></i>
                      <div>
                        <div className="small text-body-secondary">Phone</div>
                        <div className="fw-semibold small">{phone}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-shield-check text-primary fs-5"></i>
                      <div>
                        <div className="small text-body-secondary">Employment</div>
                        <div className="fw-semibold small text-success">Open to opportunities</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Career Objective & Technical Interests Card */}
          <div className="col-lg-6">
            <div className="card h-100 border-0 shadow-sm portfolio-card p-4">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="badge bg-info-subtle text-info p-3 rounded-4 fs-4">
                      <i className="bi bi-compass"></i>
                    </div>
                    <div>
                      <h3 className="h4 fw-bold mb-0">Career Objective</h3>
                      <small className="text-body-secondary">My professional goals & vision</small>
                    </div>
                  </div>

                  <p className="text-body-secondary lh-base mb-4">
                    My career objective is to work with dynamic engineering teams building mission-critical, high-scale web platforms. I aim to leverage cutting-edge frontend tools like React & TypeScript alongside distributed backend architectures powered by Node.js, Express, and modern NoSQL/SQL databases.
                  </p>
                </div>

                <div>
                  <h4 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-cpu text-primary"></i>
                    <span>Technical Interests</span>
                  </h4>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-secondary-subtle text-secondary-emphasis tech-badge">
                      <i className="bi bi-check2-circle me-1"></i>Full-Stack Web Architectures
                    </span>
                    <span className="badge bg-secondary-subtle text-secondary-emphasis tech-badge">
                      <i className="bi bi-check2-circle me-1"></i>RESTful & OpenAPI Microservices
                    </span>
                    <span className="badge bg-secondary-subtle text-secondary-emphasis tech-badge">
                      <i className="bi bi-check2-circle me-1"></i>Reactive UI & Component Systems
                    </span>
                    <span className="badge bg-secondary-subtle text-secondary-emphasis tech-badge">
                      <i className="bi bi-check2-circle me-1"></i>NoSQL Database Indexing & Aggregations
                    </span>
                    <span className="badge bg-secondary-subtle text-secondary-emphasis tech-badge">
                      <i className="bi bi-check2-circle me-1"></i>Web Security & OWASP Best Practices
                    </span>
                    <span className="badge bg-secondary-subtle text-secondary-emphasis tech-badge">
                      <i className="bi bi-check2-circle me-1"></i>CI/CD & Cloud Deployment Pipelines
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
