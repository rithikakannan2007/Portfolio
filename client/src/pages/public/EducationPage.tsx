import React, { useState, useEffect } from 'react';
import { Education } from '../../types';
import { educationService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const EducationPage: React.FC = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEdu = async () => {
      try {
        setLoading(true);
        const data = await educationService.getAll();
        setEducation(data);
      } catch (err) {
        console.error('Failed to load education records:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEdu();
  }, []);

  if (loading) return <LoadingSpinner message="Retrieving academic credentials..." />;

  return (
    <div className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Academic Background
          </span>
          <h1 className="display-5 fw-bold">Education & Credentials</h1>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Academic degrees, universities, honors, and computer science coursework retrieved from MongoDB.
          </p>
        </div>

        {education.length === 0 ? (
          <div className="text-center py-5 card border-0 shadow-sm p-5">
            <i className="bi bi-mortarboard display-3 text-body-secondary mb-3"></i>
            <h5>No education records found</h5>
            <p className="text-body-secondary">Add education records in the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {education.map((edu) => (
              <div key={edu._id} className="col-lg-8">
                <div className="card border-0 shadow-sm portfolio-card p-4 p-md-5">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start mb-3">
                    <div className="d-flex align-items-start gap-3">
                      <div className="badge bg-primary-subtle text-primary p-3 rounded-4 fs-3">
                        <i className="bi bi-mortarboard-fill"></i>
                      </div>
                      <div>
                        <h2 className="h4 fw-bold mb-1 text-primary">{edu.degree}</h2>
                        <h3 className="h6 text-body-emphasis mb-1 d-flex align-items-center gap-1">
                          <i className="bi bi-geo-alt-fill text-danger small"></i>
                          <span>{edu.institution}</span>
                        </h3>
                        {edu.grade && (
                          <span className="badge bg-success-subtle text-success small">
                            Grade: {edu.grade}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="badge bg-body-secondary text-body-secondary border rounded-pill px-3 py-2 mt-2 mt-md-0 align-self-start align-self-md-auto">
                      {edu.startYear} - {edu.endYear}
                    </span>
                  </div>

                  <p className="text-body-secondary lh-base mb-0 border-top pt-3 mt-2">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
