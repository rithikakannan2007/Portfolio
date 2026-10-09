import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Profile,
  About,
  Skill,
  Project,
  Service,
  SocialLink,
  PortfolioSettings
} from '../../types';
import {
  profileService,
  aboutService,
  skillService,
  projectService,
  serviceService,
  socialLinkService,
  settingsService
} from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const HomePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [about, setAbout] = useState<About | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [settings, setSettings] = useState<PortfolioSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const [
          profileData,
          aboutData,
          skillsData,
          projectsData,
          servicesData,
          socialData,
          settingsData
        ] = await Promise.all([
          profileService.get(),
          aboutService.get(),
          skillService.getAll(),
          projectService.getAll(),
          serviceService.getAll(),
          socialLinkService.getAll(),
          settingsService.get()
        ]);
        setProfile(profileData);
        setAbout(aboutData);
        setSkills(skillsData.slice(0, 8)); // Top 8 skills on home
        setProjects(projectsData.slice(0, 3)); // Top 3 featured projects
        setServices(servicesData.slice(0, 4));
        setSocialLinks(socialData);
        setSettings(settingsData);
      } catch (err) {
        console.error('Failed to load home page dynamic data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading dynamic portfolio..." />;
  }

  const name = profile?.name || 'Alex Morgan';
  const title = profile?.title || 'Full-Stack Developer';
  const shortIntro = profile?.shortIntro || 'A passionate Full-Stack Developer.';
  const profileImage =
    profile?.profileImage ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
  const resumeUrl = profile?.resumeUrl || '/resume';

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero-section py-5">
        <div className="container py-lg-4">
          <div className="row align-items-center flex-column-reverse flex-lg-row gy-5">
            <div className="col-lg-7">
              {profile?.status && (
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25">
                  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  <span className="small fw-semibold">{profile.status}</span>
                </div>
              )}

              <h1 className="display-4 fw-extrabold mb-3 lh-tight">
                Hi, I'm <span className="text-gradient">{name}</span>
              </h1>

              <h2 className="h3 text-secondary fw-semibold mb-3">{title}</h2>

              <p className="lead text-body-secondary mb-4 col-xl-10 fs-5 lh-base">
                {shortIntro}
              </p>

              <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                <Link to="/projects" className="btn btn-primary btn-lg rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm">
                  <span>View My Work</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>

                {settings?.showResumeButton !== false && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-lg rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2"
                  >
                    <i className="bi bi-file-earmark-pdf"></i>
                    <span>Download Resume</span>
                  </a>
                )}

                <Link to="/contact" className="btn btn-outline-secondary btn-lg rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2">
                  <i className="bi bi-envelope"></i>
                  <span>Contact Me</span>
                </Link>
              </div>

              {/* Social Media Links */}
              <div className="d-flex align-items-center gap-2 pt-2 flex-wrap">
                <span className="small text-body-secondary fw-medium me-2">Social Profiles:</span>
                {socialLinks.map((social) => (
                  <a
                    key={social._id || social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '38px', height: '38px' }}
                    title={social.platform}
                    aria-label={social.platform}
                  >
                    <i className={`bi bi-${social.icon || 'globe'} fs-6`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="col-lg-5 text-center">
              <div className="hero-avatar-wrapper">
                <img src={profileImage} alt={name} className="hero-avatar img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Snapshot */}
      {about && (
        <section className="py-5 bg-body-tertiary">
          <div className="container py-lg-4">
            <div className="row align-items-center gy-4">
              <div className="col-lg-6">
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
                  Who I Am
                </span>
                <h2 className="display-6 fw-bold mb-3">About Me</h2>
                <p className="text-body-secondary lh-base mb-4">
                  {about.aboutDescription}
                </p>
                <div className="mb-4">
                  <h6 className="fw-bold mb-2">Career Objective:</h6>
                  <p className="text-body-secondary small mb-0">{about.careerObjective}</p>
                </div>
                <Link to="/about" className="btn btn-outline-primary rounded-pill px-4">
                  Read Full Background <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm portfolio-card p-4">
                  <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-cpu text-primary"></i>
                    <span>Technical Interests</span>
                  </h5>
                  <p className="text-body-secondary small mb-3">{about.interests}</p>
                  <div className="border-top pt-3">
                    <div className="small text-body-secondary mb-1">
                      <strong>Location:</strong> {profile?.location || 'San Francisco, CA'}
                    </div>
                    <div className="small text-body-secondary mb-1">
                      <strong>Email:</strong> {profile?.email}
                    </div>
                    <div className="small text-body-secondary">
                      <strong>Phone:</strong> {profile?.phone || 'Available upon request'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Featured Skills */}
      {skills.length > 0 && (
        <section className="py-5">
          <div className="container py-lg-4">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
                  Proficiencies
                </span>
                <h2 className="display-6 fw-bold mb-0">Featured Skills</h2>
              </div>
              <Link to="/skills" className="btn btn-outline-primary btn-sm rounded-pill px-3">
                View All Skills <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="row g-3">
              {skills.map((skill) => (
                <div key={skill._id || skill.name} className="col-md-6 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm portfolio-card p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold small d-flex align-items-center gap-2">
                        <i className={`bi bi-${skill.icon || 'check-circle'} text-primary`}></i>
                        {skill.name}
                      </span>
                      <span className="badge bg-primary-subtle text-primary">{skill.percentage}%</span>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div className="progress-bar bg-primary" style={{ width: `${skill.percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Featured Projects */}
      {projects.length > 0 && (
        <section className="py-5 bg-body-tertiary">
          <div className="container py-lg-4">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
                  Recent Work
                </span>
                <h2 className="display-6 fw-bold mb-0">Featured Projects</h2>
              </div>
              <Link to="/projects" className="btn btn-outline-primary btn-sm rounded-pill px-3">
                View All Projects <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="row g-4">
              {projects.map((proj) => (
                <div key={proj._id} className="col-md-6 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm portfolio-card overflow-hidden d-flex flex-column">
                    <div style={{ height: '200px' }} className="overflow-hidden position-relative">
                      <img src={proj.image} alt={proj.title} className="w-100 h-100 object-fit-cover" />
                      {proj.category && (
                        <span className="position-absolute top-0 end-0 m-2 badge bg-dark bg-opacity-75 rounded-pill">
                          {proj.category}
                        </span>
                      )}
                    </div>
                    <div className="card-body p-4 d-flex flex-column flex-grow-1">
                      <h3 className="h5 fw-bold mb-2">{proj.title}</h3>
                      <p className="card-text text-body-secondary small flex-grow-1 mb-3">{proj.description}</p>
                      <div className="d-flex flex-wrap gap-1 mb-3">
                        {proj.technologies.slice(0, 4).map((tech, i) => (
                          <span key={i} className="badge bg-body-secondary text-body-emphasis tech-badge border">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="d-flex justify-content-between pt-3 border-top mt-auto">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                            <i className="bi bi-github me-1"></i> Code
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary rounded-pill px-3">
                            Demo <i className="bi bi-arrow-up-right ms-1"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Services Snapshot */}
      {services.length > 0 && (
        <section className="py-5">
          <div className="container py-lg-4">
            <div className="text-center mb-5">
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
                What I Offer
              </span>
              <h2 className="display-6 fw-bold">Services & Solutions</h2>
            </div>
            <div className="row g-4">
              {services.map((svc) => (
                <div key={svc._id || svc.title} className="col-md-6 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm portfolio-card p-4">
                    <div className="badge bg-primary-subtle text-primary p-3 rounded-4 fs-3 mb-3 d-inline-block" style={{ width: 'fit-content' }}>
                      <i className={`bi bi-${svc.icon || 'laptop'}`}></i>
                    </div>
                    <h3 className="h5 fw-bold mb-2">{svc.title}</h3>
                    <p className="text-body-secondary small mb-3">{svc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Contact CTA Banner */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container py-4">
          <h2 className="display-6 fw-bold mb-3">Have a project in mind or want to collaborate?</h2>
          <p className="lead mb-4 opacity-75 mx-auto" style={{ maxWidth: '650px' }}>
            I am always open to discussing web engineering opportunities, system architectures, and exciting startup ideas.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/contact" className="btn btn-light btn-lg rounded-pill px-5 fw-bold text-primary shadow-sm">
              Get in Touch <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
