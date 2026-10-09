import React, { useState, useEffect } from 'react';
import { Profile } from '../../types';
import { profileService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AlertBanner } from '../../components/common/AlertBanner';

export const AdminProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    title: '',
    shortIntro: '',
    bio: '',
    profileImage: '',
    resumeUrl: '',
    email: '',
    phone: '',
    location: '',
    status: ''
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await profileService.get();
        if (data) setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSaving(true);

    try {
      const updated = await profileService.update(profile);
      setProfile(updated);
      setSuccess('Profile details and photo updated successfully! Changes reflected immediately.');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading profile settings..." />;

  return (
    <div style={{ maxWidth: '900px' }}>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Manage Profile Information</h1>
        <p className="text-body-secondary small mb-0">
          Update your public identity, title, bio, photo URL, and contact details.
        </p>
      </div>

      <AlertBanner type="success" message={success} onClose={() => setSuccess(null)} />
      <AlertBanner type="danger" message={error} onClose={() => setError(null)} />

      <div className="card border-0 shadow-sm portfolio-card p-4 p-md-5">
        <form onSubmit={handleSubmit}>
          <div className="row g-4 mb-4 align-items-center">
            {/* Avatar Preview */}
            <div className="col-sm-auto text-center">
              <img
                src={profile.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt="Avatar Preview"
                className="rounded-circle object-fit-cover border border-3 border-primary shadow-sm"
                style={{ width: '100px', height: '100px' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                }}
              />
            </div>
            <div className="col-sm">
              <label className="form-label small fw-semibold">Profile Photo URL *</label>
              <input
                type="url"
                name="profileImage"
                className="form-control"
                required
                value={profile.profileImage}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
              />
              <div className="form-text small">Enter any public image URL (Unsplash, Cloudinary, Imgur, etc.)</div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Full Name *</label>
              <input
                type="text"
                name="name"
                className="form-control"
                required
                value={profile.name}
                onChange={handleChange}
                placeholder="Alex Morgan"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Professional Title *</label>
              <input
                type="text"
                name="title"
                className="form-control"
                required
                value={profile.title}
                onChange={handleChange}
                placeholder="Full-Stack Developer & Cloud Architect"
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Short Introduction (Hero Tagline) *</label>
              <input
                type="text"
                name="shortIntro"
                className="form-control"
                required
                value={profile.shortIntro}
                onChange={handleChange}
                placeholder="A passionate Full-Stack Developer who enjoys building modern web applications."
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Detailed Bio</label>
              <textarea
                name="bio"
                rows={4}
                className="form-control"
                value={profile.bio || ''}
                onChange={handleChange}
                placeholder="Over 5 years of engineering experience..."
              ></textarea>
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Contact Email *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                required
                value={profile.email}
                onChange={handleChange}
                placeholder="alex.morgan@example.com"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={profile.phone || ''}
                onChange={handleChange}
                placeholder="+1 (555) 382-9104"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Location</label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={profile.location || ''}
                onChange={handleChange}
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Availability Status</label>
              <input
                type="text"
                name="status"
                className="form-control"
                value={profile.status || ''}
                onChange={handleChange}
                placeholder="Available for full-time & freelance projects"
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Resume PDF URL</label>
              <input
                type="url"
                name="resumeUrl"
                className="form-control"
                value={profile.resumeUrl || ''}
                onChange={handleChange}
                placeholder="https://example.com/resume.pdf"
              />
            </div>

            <div className="col-12 pt-3">
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-5 shadow-sm d-inline-flex align-items-center gap-2"
                disabled={saving}
              >
                {saving && <span className="spinner-border spinner-border-sm" role="status"></span>}
                <span>Save Profile Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
