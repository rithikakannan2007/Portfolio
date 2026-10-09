import React, { useState, useEffect } from 'react';
import { SocialLink } from '../../types';
import { socialLinkService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AlertBanner } from '../../components/common/AlertBanner';
import { DeleteModal } from '../../components/common/DeleteModal';

export const AdminSocialLinks: React.FC = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState<{
    platform: string;
    url: string;
    icon: string;
  }>({
    platform: 'GitHub',
    url: '',
    icon: 'github'
  });

  const [linkToDelete, setLinkToDelete] = useState<SocialLink | null>(null);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const data = await socialLinkService.getAll();
      setLinks(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch social links');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handlePlatformChange = (p: string) => {
    let icon = 'globe';
    if (p.toLowerCase().includes('github')) icon = 'github';
    else if (p.toLowerCase().includes('linkedin')) icon = 'linkedin';
    else if (p.toLowerCase().includes('twitter') || p.toLowerCase().includes('x')) icon = 'twitter-x';
    else if (p.toLowerCase().includes('instagram')) icon = 'instagram';
    else if (p.toLowerCase().includes('youtube')) icon = 'youtube';
    setFormData({ ...formData, platform: p, icon });
  };

  const handleEdit = (link: SocialLink) => {
    setEditingLink(link);
    setFormData({
      platform: link.platform,
      url: link.url,
      icon: link.icon || 'globe'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingLink(null);
    setFormData({ platform: 'GitHub', url: '', icon: 'github' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSaving(true);

    try {
      if (editingLink?._id) {
        await socialLinkService.update(editingLink._id, formData);
        setSuccess(`Social link "${formData.platform}" updated!`);
      } else {
        await socialLinkService.create(formData);
        setSuccess(`Social link "${formData.platform}" added!`);
      }
      handleCancel();
      await fetchLinks();
    } catch (err: any) {
      setError(err.message || 'Failed to save social link');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!linkToDelete?._id) return;
    setDeleting(true);
    try {
      await socialLinkService.delete(linkToDelete._id);
      setSuccess(`Social link "${linkToDelete.platform}" deleted.`);
      setLinkToDelete(null);
      await fetchLinks();
    } catch (err: any) {
      setError(err.message || 'Failed to delete social link');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Manage Social Media Links</h1>
        <p className="text-body-secondary small mb-0">
          Connect your GitHub, LinkedIn, Twitter/X, Instagram, and developer community links.
        </p>
      </div>

      <AlertBanner type="success" message={success} onClose={() => setSuccess(null)} />
      <AlertBanner type="danger" message={error} onClose={() => setError(null)} />

      {/* Form */}
      <div className="card border-0 shadow-sm portfolio-card p-4 mb-4">
        <h2 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-share text-primary"></i>
          <span>{editingLink ? `Edit Link: ${editingLink.platform}` : 'Add Social Link'}</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Platform *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="GitHub, LinkedIn, Twitter/X, etc."
                value={formData.platform}
                onChange={(e) => handlePlatformChange(e.target.value)}
              />
            </div>

            <div className="col-md-5">
              <label className="form-label small fw-semibold">Profile URL *</label>
              <input
                type="url"
                required
                className="form-control"
                placeholder="https://..."
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label small fw-semibold">Icon (Bootstrap Icon)</label>
              <input
                type="text"
                className="form-control"
                placeholder="github, linkedin, etc."
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              />
            </div>

            <div className="col-12 d-flex gap-2 pt-2">
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-4 shadow-sm d-inline-flex align-items-center gap-2"
                disabled={saving}
              >
                {saving && <span className="spinner-border spinner-border-sm" role="status"></span>}
                <span>{editingLink ? 'Save Link' : 'Add Link'}</span>
              </button>
              {editingLink && (
                <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={handleCancel}>
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm portfolio-card p-4">
        <h2 className="h5 fw-bold mb-3 d-flex align-items-center justify-content-between">
          <span>Active Social Profiles ({links.length})</span>
          <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={fetchLinks}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
        </h2>

        {loading ? (
          <LoadingSpinner message="Refreshing links..." />
        ) : links.length === 0 ? (
          <div className="text-center py-4 text-body-secondary small">
            No social links listed. Add one using the form above.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>URL</th>
                  <th>Icon</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link._id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <i className={`bi bi-${link.icon || 'globe'} text-primary fs-5`}></i>
                        <span className="fw-bold">{link.platform}</span>
                      </div>
                    </td>
                    <td>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none small">
                        {link.url} <i className="bi bi-box-arrow-up-right small"></i>
                      </a>
                    </td>
                    <td><code>{link.icon}</code></td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" title="Edit" onClick={() => handleEdit(link)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" title="Delete" onClick={() => setLinkToDelete(link)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DeleteModal
        show={!!linkToDelete}
        itemDescription={linkToDelete?.platform || 'link'}
        onConfirm={confirmDelete}
        onCancel={() => setLinkToDelete(null)}
        loading={deleting}
      />
    </div>
  );
};
