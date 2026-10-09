import React, { useState, useEffect } from 'react';
import { Education } from '../../types';
import { educationService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AlertBanner } from '../../components/common/AlertBanner';
import { DeleteModal } from '../../components/common/DeleteModal';

export const AdminEducation: React.FC = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [formData, setFormData] = useState<{
    degree: string;
    institution: string;
    startYear: string;
    endYear: string;
    description: string;
    grade: string;
  }>({
    degree: '',
    institution: '',
    startYear: '',
    endYear: '',
    description: '',
    grade: ''
  });

  const [eduToDelete, setEduToDelete] = useState<Education | null>(null);

  const fetchEdu = async () => {
    try {
      setLoading(true);
      const data = await educationService.getAll();
      setEducation(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch education records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEdu();
  }, []);

  const handleEdit = (edu: Education) => {
    setEditingEdu(edu);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      startYear: edu.startYear,
      endYear: edu.endYear,
      description: edu.description,
      grade: edu.grade || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingEdu(null);
    setFormData({
      degree: '',
      institution: '',
      startYear: '',
      endYear: '',
      description: '',
      grade: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSaving(true);

    try {
      if (editingEdu?._id) {
        await educationService.update(editingEdu._id, formData);
        setSuccess(`Education record "${formData.degree}" updated successfully!`);
      } else {
        await educationService.create(formData);
        setSuccess(`Education record "${formData.degree}" added successfully!`);
      }
      handleCancel();
      await fetchEdu();
    } catch (err: any) {
      setError(err.message || 'Failed to save education record');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!eduToDelete?._id) return;
    setDeleting(true);
    try {
      await educationService.delete(eduToDelete._id);
      setSuccess(`Education record "${eduToDelete.degree}" deleted.`);
      setEduToDelete(null);
      await fetchEdu();
    } catch (err: any) {
      setError(err.message || 'Failed to delete record');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Manage Academic Education</h1>
        <p className="text-body-secondary small mb-0">
          Add university degrees, colleges, graduation years, coursework descriptions, and CGPA.
        </p>
      </div>

      <AlertBanner type="success" message={success} onClose={() => setSuccess(null)} />
      <AlertBanner type="danger" message={error} onClose={() => setError(null)} />

      {/* Form */}
      <div className="card border-0 shadow-sm portfolio-card p-4 mb-4">
        <h2 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-mortarboard text-primary"></i>
          <span>{editingEdu ? `Edit Degree: ${editingEdu.degree}` : 'Add Education Record'}</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Degree / Certification Title *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Bachelor of Science in Computer Science"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Institution / University *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="UC Berkeley"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-semibold">Start Year *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="2020"
                value={formData.startYear}
                onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-semibold">End Year *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="2024"
                value={formData.endYear}
                onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-semibold">Percentage / CGPA / Grade</label>
              <input
                type="text"
                className="form-control"
                placeholder="3.92 GPA (or 92%)"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Description / Coursework Details *</label>
              <textarea
                required
                rows={3}
                className="form-control"
                placeholder="Specialized in distributed computing, database architecture..."
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
                <span>{editingEdu ? 'Save Education' : 'Add Education'}</span>
              </button>
              {editingEdu && (
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
          <span>Education Records ({education.length})</span>
          <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={fetchEdu}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
        </h2>

        {loading ? (
          <LoadingSpinner message="Refreshing education..." />
        ) : education.length === 0 ? (
          <div className="text-center py-4 text-body-secondary small">
            No academic records found. Add your first record above.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Degree</th>
                  <th>Institution</th>
                  <th>Duration</th>
                  <th>Grade</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {education.map((edu) => (
                  <tr key={edu._id}>
                    <td className="fw-bold">{edu.degree}</td>
                    <td>{edu.institution}</td>
                    <td>
                      <span className="badge bg-secondary-subtle text-secondary-emphasis">
                        {edu.startYear} - {edu.endYear}
                      </span>
                    </td>
                    <td>{edu.grade || '-'}</td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" title="Edit" onClick={() => handleEdit(edu)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" title="Delete" onClick={() => setEduToDelete(edu)}>
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
        show={!!eduToDelete}
        itemDescription={eduToDelete?.degree || 'education record'}
        onConfirm={confirmDelete}
        onCancel={() => setEduToDelete(null)}
        loading={deleting}
      />
    </div>
  );
};
