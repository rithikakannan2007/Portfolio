import React, { useState, useEffect } from 'react';
import { About } from '../../types';
import { aboutService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AlertBanner } from '../../components/common/AlertBanner';

export const AdminAbout: React.FC = () => {
  const [about, setAbout] = useState<About>({
    aboutDescription: '',
    personalInfo: '',
    careerObjective: '',
    interests: '',
    otherInfo: ''
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAbout = async () => {
      try {
        setLoading(true);
        const data = await aboutService.get();
        if (data) setAbout(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load About info');
      } finally {
        setLoading(false);
      }
    };
    loadAbout();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAbout((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSaving(true);

    try {
      const updated = await aboutService.update(about);
      setAbout(updated);
      setSuccess('About information updated successfully! Stored directly in MongoDB.');
    } catch (err: any) {
      setError(err.message || 'Failed to update about details');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading About details..." />;

  return (
    <div style={{ maxWidth: '900px' }}>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Manage About Information</h1>
        <p className="text-body-secondary small mb-0">
          Control your background, career vision, personal story, and engineering interests.
        </p>
      </div>

      <AlertBanner type="success" message={success} onClose={() => setSuccess(null)} />
      <AlertBanner type="danger" message={error} onClose={() => setError(null)} />

      <div className="card border-0 shadow-sm portfolio-card p-4 p-md-5">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label small fw-semibold">About Description *</label>
              <textarea
                name="aboutDescription"
                rows={4}
                required
                className="form-control"
                value={about.aboutDescription}
                onChange={handleChange}
                placeholder="Comprehensive summary of who you are and what you do..."
              ></textarea>
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Personal Information *</label>
              <textarea
                name="personalInfo"
                rows={3}
                required
                className="form-control"
                value={about.personalInfo}
                onChange={handleChange}
                placeholder="Where you live, hobbies, open-source passion, mentoring..."
              ></textarea>
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Career Objective *</label>
              <textarea
                name="careerObjective"
                rows={3}
                required
                className="form-control"
                value={about.careerObjective}
                onChange={handleChange}
                placeholder="What roles or engineering challenges you aspire to tackle..."
              ></textarea>
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Technical Interests *</label>
              <textarea
                name="interests"
                rows={3}
                required
                className="form-control"
                value={about.interests}
                onChange={handleChange}
                placeholder="Distributed systems, React architecture, cloud pipelines..."
              ></textarea>
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Other Information (Optional)</label>
              <textarea
                name="otherInfo"
                rows={2}
                className="form-control"
                value={about.otherInfo || ''}
                onChange={handleChange}
                placeholder="Speaking engagements, availability for contracts, etc."
              ></textarea>
            </div>

            <div className="col-12 pt-3">
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-5 shadow-sm d-inline-flex align-items-center gap-2"
                disabled={saving}
              >
                {saving && <span className="spinner-border spinner-border-sm" role="status"></span>}
                <span>Save About Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
