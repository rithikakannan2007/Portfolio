import React, { useState, useEffect } from 'react';
import { Experience } from '../../types';
import { experienceService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const ExperiencePage: React.FC = () => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExp = async () => {
      try {
        setLoading(true);
        const data = await experienceService.getAll();
        setExperience(data);
      } catch (err) {
        console.error('Failed to load experience records:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExp();
  }, []);

  if (loading) return <LoadingSpinner message="Retrieving professional work history..." />;

  return (
    <div className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Career Journey
          </span>
          <h1 className="display-5 fw-bold">Work Experience & Internships</h1>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Professional roles, engineering accomplishments, and responsibilities delivered across industry teams.
          </p>
        </div>

        {experience.length === 0 ? (
          <div className="text-center py-5 card border-0 shadow-sm p-5">
            <i className="bi bi-briefcase display-3 text-body-secondary mb-3"></i>
            <h5>No experience records found</h5>
            <p className="text-body-secondary">Add experience records in the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="timeline-line ps-4">
                {experience.map((exp) => (
                  <div key={exp._id} className="position-relative mb-5">
                    <div className="timeline-dot"></div>
                    <div className="card border-0 shadow-sm portfolio-card p-4 p-md-5">
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start mb-3">
                        <div>
                          <h2 className="h4 fw-bold mb-1 text-primary">{exp.position}</h2>
                          <h3 className="h6 fw-semibold text-body-emphasis mb-0 d-flex align-items-center gap-2">
                            <i className="bi bi-building"></i>
                            {exp.company}
                          </h3>
                        </div>
                        <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-3 py-2 fw-medium mt-2 mt-md-0 align-self-start align-self-md-auto">
                          <i className="bi bi-calendar-event me-1"></i>
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>

                      <p className="text-body-secondary lh-base mb-3 border-top pt-3">
                        {exp.description}
                      </p>

                      {exp.technologies && exp.technologies.length > 0 && (
                        <div>
                          <span className="small text-muted fw-bold me-2">Technologies Used:</span>
                          <div className="d-inline-flex flex-wrap gap-1 mt-2">
                            {exp.technologies.map((tech, idx) => (
                              <span key={idx} className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-10 tech-badge">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
