import React, { useState, useEffect } from 'react';
import { Certification } from '../../types';
import { certificationService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const CertificationsPage: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        setLoading(true);
        const data = await certificationService.getAll();
        setCertifications(data);
      } catch (err) {
        console.error('Failed to load certifications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  if (loading) return <LoadingSpinner message="Retrieving certifications..." />;

  return (
    <div className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Verified Credentials
          </span>
          <h1 className="display-5 fw-bold">Licenses & Certifications</h1>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Accredited industry certifications, cloud architecture credentials, and verified specialization diplomas.
          </p>
        </div>

        {certifications.length === 0 ? (
          <div className="text-center py-5 card border-0 shadow-sm p-5">
            <i className="bi bi-award display-3 text-body-secondary mb-3"></i>
            <h5>No certifications recorded</h5>
            <p className="text-body-secondary">Add certifications in the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {certifications.map((cert) => (
              <div key={cert._id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm portfolio-card p-4 d-flex flex-column">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="badge bg-primary-subtle text-primary p-3 rounded-4 fs-3">
                      <i className="bi bi-patch-check-fill"></i>
                    </div>
                    <div>
                      <h2 className="h5 fw-bold mb-1">{cert.name}</h2>
                      <h3 className="h6 text-primary mb-0">{cert.issuingOrganization}</h3>
                    </div>
                  </div>

                  <div className="small text-body-secondary mb-3 mt-auto">
                    <div>
                      <strong>Issued:</strong> {cert.issueDate}
                    </div>
                    {cert.certificateId && (
                      <div>
                        <strong>Credential ID:</strong> <span className="font-monospace">{cert.certificateId}</span>
                      </div>
                    )}
                  </div>

                  {cert.certificateUrl && (
                    <div className="pt-3 border-top mt-auto">
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm rounded-pill w-100 d-inline-flex align-items-center justify-content-center gap-1"
                      >
                        <span>Verify Credential</span>
                        <i className="bi bi-box-arrow-up-right small"></i>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
