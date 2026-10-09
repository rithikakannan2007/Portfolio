import React, { useState, useEffect } from 'react';
import { Achievement } from '../../types';
import { achievementService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AlertBanner } from '../../components/common/AlertBanner';
import { DeleteModal } from '../../components/common/DeleteModal';

export const AdminAchievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [editingAch, setEditingAch] = useState<Achievement | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    organization: string;
    date: string;
    description: string;
    awardUrl: string;
  }>({
    title: '',
    organization: '',
    date: '',
    description: '',
    awardUrl: ''
  });

  const [achToDelete, setAchToDelete] = useState<Achievement | null>(null);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const data = await achievementService.getAll();
      setAchievements(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch achievements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleEdit = (ach: Achievement) => {
    setEditingAch(ach);
    setFormData({
      title: ach.title,
      organization: ach.organization,
      date: ach.date,
      description: ach.description,
      awardUrl: ach.awardUrl || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingAch(null);
    setFormData({
      title: '',
      organization: '',
      date: '',
      description: '',
      awardUrl: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSaving(true);

    try {
      if (editingAch?._id) {
        await achievementService.update(editingAch._id, formData);
        setSuccess(`Achievement "${formData.title}" updated successfully!`);
      } else {
        await achievementService.create(formData);
        setSuccess(`Achievement "${formData.title}" added successfully!`);
      }
      handleCancel();
      await fetchAchievements();
    } catch (err: any) {
      setError(err.message || 'Failed to save achievement');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!achToDelete?._id) return;
    setDeleting(true);
    try {
      await achievementService.delete(achToDelete._id);
      setSuccess(`Achievement "${achToDelete.title}" removed.`);
      setAchToDelete(null);
      await fetchAchievements();
    } catch (err: any) {
      setError(err.message || 'Failed to delete achievement');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Manage Honors & Achievements</h1>
        <p className="text-body-secondary small mb-0">
          Document hackathon victories, engineering distinctions, and leadership awards.
        </p>
      </div>

      <AlertBanner type="success" message={success} onClose={() => setSuccess(null)} />
      <AlertBanner type="danger" message={error} onClose={() => setError(null)} />

      {/* Form */}
      <div className="card border-0 shadow-sm portfolio-card p-4 mb-4">
        <h2 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-trophy text-primary"></i>
          <span>{editingAch ? `Edit Achievement: ${editingAch.title}` : 'Add New Achievement'}</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Achievement Title *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="1st Place Winner – National Hackathon"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Organization / Event *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Silicon Valley Hackathons"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-semibold">Date / Month & Year *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Nov 2024"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="col-md-8">
              <label className="form-label small fw-semibold">Award / Verification URL</label>
              <input
                type="url"
                className="form-control"
                placeholder="https://example.com/award"
                value={formData.awardUrl}
                onChange={(e) => setFormData({ ...formData, awardUrl: e.target.value })}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Description *</label>
              <textarea
                required
                rows={3}
                className="form-control"
                placeholder="Details of the award, competition size, impact..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div className="col-12 d-flex gap-2 pt-2">
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-4 shadow-sm d-inline-flex align-items-center gap-2"
                disabled={saving}
              >
                {saving && <span className="spinner-border spinner-border-sm" role="status"></span>}
                <span>{editingAch ? 'Save Achievement' : 'Add Achievement'}</span>
              </button>
              {editingAch && (
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
          <span>Achievements List ({achievements.length})</span>
          <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={fetchAchievements}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
        </h2>

        {loading ? (
          <LoadingSpinner message="Refreshing achievements..." />
        ) : achievements.length === 0 ? (
          <div className="text-center py-4 text-body-secondary small">
            No achievements recorded yet. Add one above.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Organization</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {achievements.map((ach) => (
                  <tr key={ach._id}>
                    <td className="fw-bold">{ach.title}</td>
                    <td>{ach.organization}</td>
                    <td>{ach.date}</td>
                    <td className="text-body-secondary small text-truncate" style={{ maxWidth: '250px' }}>
                      {ach.description}
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" title="Edit" onClick={() => handleEdit(ach)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" title="Delete" onClick={() => setAchToDelete(ach)}>
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
        show={!!achToDelete}
        itemDescription={achToDelete?.title || 'achievement'}
        onConfirm={confirmDelete}
        onCancel={() => setAchToDelete(null)}
        loading={deleting}
      />
    </div>
  );
};
