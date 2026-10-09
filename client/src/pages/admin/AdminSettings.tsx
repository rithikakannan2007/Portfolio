import React, { useState, useEffect } from 'react';
import { PortfolioSettings } from '../../types';
import { settingsService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AlertBanner } from '../../components/common/AlertBanner';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<PortfolioSettings>({
    siteTitle: '',
    metaDescription: '',
    primaryColor: '#6366f1',
    enableContactForm: true,
    showResumeButton: true,
    customFooterText: ''
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await settingsService.get();
        if (data) setSettings(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setSettings((prev) => ({ ...prev, [name]: checked }));
    } else {
      setSettings((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSaving(true);

    try {
      const updated = await settingsService.update(settings);
      setSettings(updated);
      setSuccess('Portfolio configuration updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading site settings..." />;

  return (
    <div style={{ maxWidth: '850px' }}>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Portfolio Settings & Configuration</h1>
        <p className="text-body-secondary small mb-0">
          Control global metadata, contact form behavior, resume buttons, and custom footer texts.
        </p>
      </div>

      <AlertBanner type="success" message={success} onClose={() => setSuccess(null)} />
      <AlertBanner type="danger" message={error} onClose={() => setError(null)} />

      <div className="card border-0 shadow-sm portfolio-card p-4 p-md-5">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label small fw-semibold">Website Title *</label>
              <input
                type="text"
                required
                name="siteTitle"
                className="form-control"
                placeholder="Alex Morgan | Full-Stack Developer"
                value={settings.siteTitle}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">SEO Meta Description</label>
              <textarea
                rows={3}
                name="metaDescription"
                className="form-control"
                placeholder="Professional Full-Stack Developer Portfolio showcasing web applications..."
                value={settings.metaDescription}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Brand Accent Color</label>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="color"
                  name="primaryColor"
                  className="form-control form-control-color"
                  value={settings.primaryColor || '#6366f1'}
                  onChange={handleChange}
                  title="Choose primary color"
                />
                <input
                  type="text"
                  name="primaryColor"
                  className="form-control font-monospace"
                  value={settings.primaryColor || '#6366f1'}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-md-6 pt-md-4">
              <div className="form-check form-switch mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="enableContactFormSwitch"
                  name="enableContactForm"
                  checked={settings.enableContactForm}
                  onChange={handleChange}
                />
                <label className="form-check-label small fw-semibold" htmlFor="enableContactFormSwitch">
                  Enable Public Contact Form
                </label>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showResumeButtonSwitch"
                  name="showResumeButton"
                  checked={settings.showResumeButton}
                  onChange={handleChange}
                />
                <label className="form-check-label small fw-semibold" htmlFor="showResumeButtonSwitch">
                  Show "Download Resume" in Hero
                </label>
              </div>
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Custom Footer Attribution Text</label>
              <input
                type="text"
                name="customFooterText"
                className="form-control"
                placeholder="Built with React, TypeScript, Express & MongoDB"
                value={settings.customFooterText}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 pt-3">
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-5 shadow-sm d-inline-flex align-items-center gap-2"
                disabled={saving}
              >
                {saving && <span className="spinner-border spinner-border-sm" role="status"></span>}
                <span>Save Site Settings</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
