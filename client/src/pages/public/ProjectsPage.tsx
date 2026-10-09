import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { projectService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectService.getAll();
        setProjects(data);
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <LoadingSpinner message="Retrieving dynamic projects from MongoDB..." />;

  const categories = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.category || 'General').filter(Boolean)))
  ];

  const filtered = projects.filter((project) => {
    const matchesCat = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Portfolio Showcase
          </span>
          <h1 className="display-5 fw-bold">Projects & Applications</h1>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Production systems, full-stack web applications, and technical experiments retrieved dynamically from MongoDB.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="row g-3 justify-content-between align-items-center mb-4">
          <div className="col-md-8">
            <div className="d-flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`btn btn-sm rounded-pill px-3 ${
                    selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary'
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-body border-end-0">
                <i className="bi bi-search text-body-secondary"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-5 card border-0 shadow-sm p-5">
            <i className="bi bi-folder-x display-3 text-body-secondary mb-3"></i>
            <h5>No projects matched your criteria</h5>
            <p className="text-body-secondary">Try adjusting filters or adding a project in the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filtered.map((proj) => (
              <div key={proj._id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm portfolio-card overflow-hidden d-flex flex-column">
                  {/* Image */}
                  <div style={{ height: '220px' }} className="overflow-hidden position-relative bg-body-tertiary">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-100 h-100 object-fit-cover"
                      loading="lazy"
                    />
                    {proj.category && (
                      <span className="position-absolute top-0 end-0 m-2 badge bg-dark bg-opacity-75 rounded-pill px-3 py-1">
                        {proj.category}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="card-body p-4 d-flex flex-column flex-grow-1">
                    <h2 className="h5 fw-bold mb-2">{proj.title}</h2>
                    <p className="card-text text-body-secondary small flex-grow-1 lh-base mb-3">
                      {proj.description}
                    </p>

                    <div className="d-flex flex-wrap gap-1 mb-4">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-10 tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between pt-3 border-top mt-auto">
                      {proj.githubUrl ? (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-secondary rounded-pill px-3 d-inline-flex align-items-center gap-1"
                        >
                          <i className="bi bi-github"></i>
                          <span>GitHub</span>
                        </a>
                      ) : (
                        <span className="text-muted small">Private Code</span>
                      )}

                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-primary rounded-pill px-3 d-inline-flex align-items-center gap-1"
                        >
                          <span>Live Demo</span>
                          <i className="bi bi-arrow-up-right"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
