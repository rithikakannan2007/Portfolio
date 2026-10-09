import React, { useState, useEffect } from 'react';
import { Service } from '../../types';
import { serviceService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await serviceService.getAll();
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <LoadingSpinner message="Retrieving service offerings..." />;

  return (
    <div className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            What I Deliver
          </span>
          <h1 className="display-5 fw-bold">Services & Technical Offerings</h1>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Comprehensive software engineering capabilities available for freelance, contract, and full-time projects.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-5 card border-0 shadow-sm p-5">
            <i className="bi bi-laptop display-3 text-body-secondary mb-3"></i>
            <h5>No services listed</h5>
            <p className="text-body-secondary">Add services in the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="row g-4">
            {services.map((svc) => (
              <div key={svc._id || svc.title} className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm portfolio-card p-4 d-flex flex-column">
                  <div className="badge bg-primary-subtle text-primary p-3 rounded-4 fs-3 mb-3 d-inline-block" style={{ width: 'fit-content' }}>
                    <i className={`bi bi-${svc.icon || 'laptop'}`}></i>
                  </div>
                  <h2 className="h5 fw-bold mb-2">{svc.title}</h2>
                  <p className="text-body-secondary small mb-3 flex-grow-1">{svc.description}</p>

                  {svc.features && svc.features.length > 0 && (
                    <ul className="list-unstyled small mb-0 pt-3 border-top d-flex flex-column gap-2 text-body-secondary">
                      {svc.features.map((feat, i) => (
                        <li key={i} className="d-flex align-items-center gap-2">
                          <i className="bi bi-check2 text-primary fw-bold"></i>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
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
