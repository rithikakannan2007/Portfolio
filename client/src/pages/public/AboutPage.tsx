import React, { useState, useEffect } from 'react';
import { About, Profile } from '../../types';
import { aboutService, profileService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const AboutPage: React.FC = () => {
  const [about, setAbout] = useState<About | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [aboutData, profileData] = await Promise.all([
          aboutService.get(),
          profileService.get()
        ]);
        setAbout(aboutData);
        setProfile(profileData);
      } catch (err) {
        console.error('Failed to load About page data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner message="Loading About details..." />;

  return (
    <div className="py-5">
      <div className="container py-lg-4">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Detailed Profile
          </span>
          <h1 className="display-5 fw-bold">About Me</h1>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Learn more about my background, career objectives, technical philosophies, and engineering experience.
          </p>
        </div>

        <div className="row g-4 mb-5">
          {/* Main Description */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm portfolio-card p-4 p-md-5 mb-4">
              <h2 className="h4 fw-bold mb-3 d-flex align-items-center gap-2 text-primary">
                <i className="bi bi-person-lines-fill"></i>
                <span>Professional Background</span>
              </h2>
              <p className="lead text-body-secondary mb-4 lh-base">
                {about?.aboutDescription || 'Full-stack software engineer specializing in scalable modern web platforms.'}
              </p>

              <h3 className="h5 fw-bold mb-2">Personal Information</h3>
              <p className="text-body-secondary mb-4 lh-base">
                {about?.personalInfo || 'Based in San Francisco, California.'}
              </p>

              <h3 className="h5 fw-bold mb-2">Career Objective</h3>
              <p className="text-body-secondary mb-4 lh-base">
                {about?.careerObjective || 'To build high-performance software systems.'}
              </p>

              <h3 className="h5 fw-bold mb-2">Technical Interests</h3>
              <p className="text-body-secondary mb-4 lh-base">
                {about?.interests || 'React, TypeScript, Distributed Systems, Microservices.'}
              </p>

              {about?.otherInfo && (
                <>
                  <h3 className="h5 fw-bold mb-2">Additional Information</h3>
                  <p className="text-body-secondary mb-0 lh-base">{about.otherInfo}</p>
                </>
              )}
            </div>
          </div>

          {/* Quick Contact & Profile Meta Sidebar */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm portfolio-card p-4 mb-4 text-center">
              <img
                src={profile?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={profile?.name || 'Profile'}
                className="rounded-circle mx-auto mb-3 object-fit-cover border border-4 border-primary"
                style={{ width: '130px', height: '130px' }}
              />
              <h3 className="h5 fw-bold mb-1">{profile?.name}</h3>
              <div className="text-secondary small fw-medium mb-3">{profile?.title}</div>
              <div className="badge bg-success-subtle text-success rounded-pill px-3 py-2 mb-4">
                <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.6rem' }}></i>
                {profile?.status || 'Open to Opportunities'}
              </div>

              <div className="text-start border-top pt-3 d-flex flex-column gap-2 small">
                <div>
                  <i className="bi bi-geo-alt text-primary me-2"></i>
                  <strong>Location:</strong> {profile?.location || 'San Francisco, CA'}
                </div>
                <div>
                  <i className="bi bi-envelope text-primary me-2"></i>
                  <strong>Email:</strong> {profile?.email}
                </div>
                <div>
                  <i className="bi bi-telephone text-primary me-2"></i>
                  <strong>Phone:</strong> {profile?.phone || 'Available upon request'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
