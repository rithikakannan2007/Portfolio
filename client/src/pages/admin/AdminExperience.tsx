import React, { useState, useEffect } from 'react';
import { Experience } from '../../types';
import { experienceService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AlertBanner } from '../../components/common/AlertBanner';
import { DeleteModal } from '../../components/common/DeleteModal';

export const AdminExperience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    technologies: string;
  }>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    technologies: ''
  });

  const [expToDelete, setExpToDelete] = useState<Experience | null>(null);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const data = await experienceService.getAll();
      setExperiences(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch experience records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleEdit = (exp: Experience) => {
    setEditingExp(exp);
    setFormData({
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      technologies: (exp.technologies || []).join(', ')
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingExp(null);
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      technologies: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSaving(true);

    const payload = {
      company: formData.company,
      position: formData.position,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
      technologies: formData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    };

    try {
      if (editingExp?._id) {
        await experienceService.update(editingExp._id, payload);
        setSuccess(`Experience record at "${formData.company}" updated successfully!`);
      } else {
        await experienceService.create(payload);
        setSuccess(`Experience record at "${formData.company}" added successfully!`);
      }
      handleCancel();
      await fetchExperience();
    } catch (err: any) {
      setError(err.message || 'Failed to save experience record');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!expToDelete?._id) return;
    setDeleting(true);
    try {
      await experienceService.delete(expToDelete._id);
      setSuccess(`Experience record at "${expToDelete.company}" removed.`);
      setExpToDelete(null);
      await fetchExperience();
    } catch (err: any) {
      setError(err.message || 'Failed to delete record');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Manage Work Experience</h1>
        <p className="text-body-secondary small mb-0">
          Add career positions, company details, responsibilities, and technologies used.
        </p>
      </div>

      <AlertBanner type="success" message={success} onClose={() => setSuccess(null)} />
      <AlertBanner type="danger" message={error} onClose={() => setError(null)} />

      {/* Form */}
      <div className="card border-0 shadow-sm portfolio-card p-4 mb-4">
        <h2 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-briefcase text-primary"></i>
          <span>{editingExp ? `Edit Position: ${editingExp.position}` : 'Add Work Experience'}</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Company Name *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="TechWave Solutions"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Position / Role *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Full-Stack Developer Associate"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Start Date *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Jan 2024"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">End Date *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Present (or Dec 2024)"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Description / Key Responsibilities *</label>
              <textarea
                required
                rows={3}
                className="form-control"
                placeholder="Architected responsive web frontends, developed microservices..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Technologies Used (Comma-separated)</label>
              <input
                type="text"
                className="form-control"
                placeholder="React, TypeScript, Express, MongoDB"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              />
            </div>

            <div className="col-12 d-flex gap-2 pt-2">
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-4 shadow-sm d-inline-flex align-items-center gap-2"
                disabled={saving}
              >
                {saving && <span className="spinner-border spinner-border-sm" role="status"></span>}
                <span>{editingExp ? 'Save Experience' : 'Add Experience'}</span>
              </button>
              {editingExp && (
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
          <span>Experience Records ({experiences.length})</span>
          <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={fetchExperience}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
        </h2>

        {loading ? (
          <LoadingSpinner message="Refreshing experiences..." />
        ) : experiences.length === 0 ? (
          <div className="text-center py-4 text-body-secondary small">
            No work experience records found. Add one using the form above.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Company</th>
                  <th>Duration</th>
                  <th>Technologies</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((exp) => (
                  <tr key={exp._id}>
                    <td className="fw-bold">{exp.position}</td>
                    <td>{exp.company}</td>
                    <td>
                      <span className="badge bg-secondary-subtle text-secondary-emphasis">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {(exp.technologies || []).map((t, i) => (
                          <span key={i} className="badge bg-body-secondary text-body-secondary border tech-badge">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" title="Edit" onClick={() => handleEdit(exp)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" title="Delete" onClick={() => setExpToDelete(exp)}>
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
        show={!!expToDelete}
        itemDescription={expToDelete?.position ? `${expToDelete.position} at ${expToDelete.company}` : 'record'}
        onConfirm={confirmDelete}
        onCancel={() => setExpToDelete(null)}
        loading={deleting}
      />
    </div>
  );
};
