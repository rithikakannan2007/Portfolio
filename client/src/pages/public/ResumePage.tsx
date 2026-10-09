import React, { useState, useEffect } from 'react';
import { Resume } from '../../types';
import { resumeService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const ResumePage: React.FC = () => {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const data = await resumeService.get();
        setResume(data);
      } catch (err) {
        console.error('Failed to load resume info:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  if (loading) return <LoadingSpinner message="Retrieving resume document..." />;

  const fileUrl = resume?.fileUrl || '#';
  const title = resume?.title || 'Full-Stack Software Engineer Resume';
  const summary =
    resume?.summary ||
    'Experienced Full-Stack Software Engineer with expertise in modern JavaScript/TypeScript, React, Node.js, Express, and MongoDB.';
  const lastUpdated = resume?.lastUpdated || 'Current';

  return (
    <div className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Curriculum Vitae
          </span>
          <h1 className="display-5 fw-bold">{title}</h1>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Latest verified resume and professional credentials. Last updated: <strong>{lastUpdated}</strong>.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm portfolio-card p-4 p-md-5 text-center">
              <div className="badge bg-primary-subtle text-primary p-4 rounded-circle fs-1 mx-auto mb-4" style={{ width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-file-earmark-pdf-fill"></i>
              </div>

              <h2 className="h4 fw-bold mb-3">{title}</h2>
              <p className="text-body-secondary lh-base mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                {summary}
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-3">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm d-inline-flex align-items-center gap-2"
                >
                  <i className="bi bi-box-arrow-up-right"></i>
                  <span>View Resume</span>
                </a>
                <a
                  href={fileUrl}
                  download
                  className="btn btn-outline-secondary btn-lg rounded-pill px-4 d-inline-flex align-items-center gap-2"
                >
                  <i className="bi bi-download"></i>
                  <span>Download PDF</span>
                </a>
              </div>

              <div className="mt-4 pt-3 border-top text-body-secondary small">
                Directly managed and updated via the Admin Dashboard.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
