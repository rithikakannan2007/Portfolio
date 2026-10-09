import React, { useState, useEffect } from 'react';
import { Achievement } from '../../types';
import { achievementService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const AchievementsPage: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAch = async () => {
      try {
        setLoading(true);
        const data = await achievementService.getAll();
        setAchievements(data);
      } catch (err) {
        console.error('Failed to load achievements:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAch();
  }, []);

  if (loading) return <LoadingSpinner message="Retrieving achievements & awards..." />;

  return (
    <div className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Honors & Recognitions
          </span>
          <h1 className="display-5 fw-bold">Achievements & Awards</h1>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Competitive hackathons, open-source recognitions, and university distinctions retrieved from MongoDB.
          </p>
        </div>

        {achievements.length === 0 ? (
          <div className="text-center py-5 card border-0 shadow-sm p-5">
            <i className="bi bi-trophy display-3 text-body-secondary mb-3"></i>
            <h5>No achievements recorded</h5>
            <p className="text-body-secondary">Add achievements in the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {achievements.map((ach) => (
              <div key={ach._id} className="col-lg-8">
                <div className="card border-0 shadow-sm portfolio-card p-4 p-md-5">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start mb-3">
                    <div className="d-flex align-items-start gap-3">
                      <div className="badge bg-warning-subtle text-warning-emphasis p-3 rounded-4 fs-3">
                        <i className="bi bi-trophy-fill text-warning"></i>
                      </div>
                      <div>
                        <h2 className="h4 fw-bold mb-1 text-primary">{ach.title}</h2>
                        <h3 className="h6 text-body-emphasis mb-0">{ach.organization}</h3>
                      </div>
                    </div>
                    <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-3 py-2 mt-2 mt-md-0 align-self-start align-self-md-auto">
                      {ach.date}
                    </span>
                  </div>

                  <p className="text-body-secondary lh-base mb-3 border-top pt-3">
                    {ach.description}
                  </p>

                  {ach.awardUrl && (
                    <div className="pt-2">
                      <a
                        href={ach.awardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1"
                      >
                        <span>View Award Details</span>
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
