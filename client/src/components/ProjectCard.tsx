import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="card h-100 border-0 shadow-sm portfolio-card bg-body overflow-hidden d-flex flex-column">
      {/* Project Image */}
      <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-100 h-100 object-fit-cover"
          loading="lazy"
          onError={(e) => {
            // Fallback placeholder if image link is broken
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="position-absolute bottom-0 start-0 w-100 p-2 bg-gradient bg-dark bg-opacity-50 d-flex justify-content-end gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-light rounded-circle shadow-sm"
              title="View GitHub Repository"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <i className="bi bi-github"></i>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-primary rounded-circle shadow-sm"
              title="View Live Demo"
              aria-label={`Live demo for ${project.title}`}
            >
              <i className="bi bi-box-arrow-up-right"></i>
            </a>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body p-4 d-flex flex-column flex-grow-1">
        <h3 className="card-title h5 fw-bold mb-2">{project.title}</h3>
        <p className="card-text text-body-secondary small flex-grow-1 lh-base mb-3">
          {project.description}
        </p>

        {/* Technologies Badges */}
        <div className="d-flex flex-wrap gap-1 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="badge bg-primary bg-opacity-10 text-primary tech-badge border border-primary border-opacity-10">
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-secondary rounded-pill px-3 d-inline-flex align-items-center gap-1"
            >
              <i className="bi bi-github"></i>
              <span>Code</span>
            </a>
          ) : (
            <span className="text-muted small">Private Repo</span>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
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
  );
};
