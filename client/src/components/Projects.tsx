import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { projectService } from '../services/api';
import { ProjectCard } from './ProjectCard';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectService.getAll();
      setProjects(data);
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setError(err.message || 'Failed to retrieve projects from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Compute unique tech tags for quick filtering
  const allTechnologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies || []))
  ).slice(0, 8); // Top 8 technologies

  // Filter projects based on selected tech tag and search query
  const filteredProjects = projects.filter((project) => {
    const matchesTech =
      selectedTech === 'All' || project.technologies.some((t) => t.toLowerCase() === selectedTech.toLowerCase());
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTech && matchesSearch;
  });

  return (
    <section id="projects" className="py-5 bg-body-tertiary">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Portfolio Showcase
          </span>
          <h2 className="display-6 fw-bold">Featured Projects</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Real-world applications built with scalable client and server architectures, retrieved dynamically from MongoDB via Express REST API.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="row g-3 justify-content-between align-items-center mb-4">
          <div className="col-md-6 col-lg-8">
            <div className="d-flex flex-wrap gap-2">
              <button
                className={`btn btn-sm rounded-pill px-3 ${
                  selectedTech === 'All' ? 'btn-primary' : 'btn-outline-secondary'
                }`}
                onClick={() => setSelectedTech('All')}
              >
                All ({projects.length})
              </button>
              {allTechnologies.map((tech) => (
                <button
                  key={tech}
                  className={`btn btn-sm rounded-pill px-3 ${
                    selectedTech === tech ? 'btn-primary' : 'btn-outline-secondary'
                  }`}
                  onClick={() => setSelectedTech(tech)}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="input-group">
              <span className="input-group-text bg-body border-end-0">
                <i className="bi bi-search text-body-secondary"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search projects"
              />
              {searchQuery && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setSearchQuery('')}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading projects...</span>
            </div>
            <p className="text-body-secondary mt-3">Fetching projects from MongoDB REST API...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="alert alert-danger d-flex align-items-center justify-content-between p-4 rounded-4 shadow-sm" role="alert">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-exclamation-triangle-fill fs-2"></i>
              <div>
                <h5 className="alert-heading mb-1">Could not connect to Projects API</h5>
                <p className="mb-0 small">{error}</p>
              </div>
            </div>
            <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={fetchProjects}>
              <i className="bi bi-arrow-clockwise me-1"></i> Retry
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && filteredProjects.length > 0 && (
          <div className="row g-4">
            {filteredProjects.map((project) => (
              <div key={project._id} className="col-md-6 col-lg-4">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-5 card border-0 shadow-sm p-5">
            <i className="bi bi-folder2-open display-1 text-body-secondary mb-3"></i>
            <h4 className="fw-bold">No projects matched your search criteria</h4>
            <p className="text-body-secondary">Try selecting a different filter tag or clearing the search query.</p>
            <button
              className="btn btn-primary rounded-pill px-4 mx-auto"
              onClick={() => {
                setSelectedTech('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
