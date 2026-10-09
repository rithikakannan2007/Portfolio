import React, { useState, useEffect } from 'react';
import { Resume } from '../../types';
import { resumeService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AlertBanner } from '../../components/common/AlertBanner';

export const AdminResume: React.FC = () => {
  const [resume, setResume] = useState<Resume>({
    title: '',
    fileUrl: '',
    summary: '',
    lastUpdated: ''
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const data = await resumeService.get();
        if (data) setResume(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load resume details');
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResume((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSaving(true);

    try {
      const updated = await resumeService.update(resume);
      setResume(updated);
      setSuccess('Resume metadata and file URL updated successfully in MongoDB!');
    } catch (err: any) {
      setError(err.message || 'Failed to save resume details');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading resume settings..." />;

  return (
    <div style={{ maxWidth: '800px' }}>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Manage Public Resume</h1>
        <p className="text-body-secondary small mb-0">
          Upload or link your latest curriculum vitae document (PDF / Cloud link) for public visitors.
        </p>
      </div>

      <AlertBanner type="success" message={success} onClose={() => setSuccess(null)} />
      <AlertBanner type="danger" message={error} onClose={() => setError(null)} />

      <div className="card border-0 shadow-sm portfolio-card p-4 p-md-5">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label small fw-semibold">Resume Title *</label>
              <input
                type="text"
                required
                name="title"
                className="form-control"
                placeholder="Alex Morgan – Full-Stack Software Engineer Resume"
                value={resume.title}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Resume File URL (PDF or Cloud Document) *</label>
              <input
                type="url"
                required
                name="fileUrl"
                className="form-control"
                placeholder="https://your-domain.com/resume.pdf"
                value={resume.fileUrl}
                onChange={handleChange}
              />
              <div className="form-text small">
                Paste a direct link to your PDF hosted on Google Drive, GitHub, Cloudinary, AWS S3, etc.
              </div>
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Last Updated Date / Tag</label>
              <input
                type="text"
                name="lastUpdated"
                className="form-control"
                placeholder="October 2026"
                value={resume.lastUpdated}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Executive Summary *</label>
              <textarea
                required
                rows={4}
                name="summary"
                className="form-control"
                placeholder="Brief summary of skills, total experience, and strengths..."
                value={resume.summary}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 pt-3">
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-5 shadow-sm d-inline-flex align-items-center gap-2"
                disabled={saving}
              >
                {saving && <span className="spinner-border spinner-border-sm" role="status"></span>}
                <span>Save Resume Settings</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
