import React, { useState, useEffect } from 'react';
import { Certification } from '../../types';
import { certificationService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AlertBanner } from '../../components/common/AlertBanner';
import { DeleteModal } from '../../components/common/DeleteModal';

export const AdminCertifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    issuingOrganization: string;
    issueDate: string;
    certificateId: string;
    certificateUrl: string;
  }>({
    name: '',
    issuingOrganization: '',
    issueDate: '',
    certificateId: '',
    certificateUrl: ''
  });

  const [certToDelete, setCertToDelete] = useState<Certification | null>(null);

  const fetchCerts = async () => {
    try {
      setLoading(true);
      const data = await certificationService.getAll();
      setCertifications(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch certifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleEdit = (cert: Certification) => {
    setEditingCert(cert);
    setFormData({
      name: cert.name,
      issuingOrganization: cert.issuingOrganization,
      issueDate: cert.issueDate,
      certificateId: cert.certificateId || '',
      certificateUrl: cert.certificateUrl || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingCert(null);
    setFormData({
      name: '',
      issuingOrganization: '',
      issueDate: '',
      certificateId: '',
      certificateUrl: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSaving(true);

    try {
      if (editingCert?._id) {
        await certificationService.update(editingCert._id, formData);
        setSuccess(`Certification "${formData.name}" updated successfully!`);
      } else {
        await certificationService.create(formData);
        setSuccess(`Certification "${formData.name}" added successfully!`);
      }
      handleCancel();
      await fetchCerts();
    } catch (err: any) {
      setError(err.message || 'Failed to save certification');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!certToDelete?._id) return;
    setDeleting(true);
    try {
      await certificationService.delete(certToDelete._id);
      setSuccess(`Certification "${certToDelete.name}" deleted.`);
      setCertToDelete(null);
      await fetchCerts();
    } catch (err: any) {
      setError(err.message || 'Failed to delete certification');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Manage Certifications</h1>
        <p className="text-body-secondary small mb-0">
          Add verified licenses, cloud qualifications, and specialized diplomas.
        </p>
      </div>

      <AlertBanner type="success" message={success} onClose={() => setSuccess(null)} />
      <AlertBanner type="danger" message={error} onClose={() => setError(null)} />

      {/* Form */}
      <div className="card border-0 shadow-sm portfolio-card p-4 mb-4">
        <h2 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-award text-primary"></i>
          <span>{editingCert ? `Edit Certification: ${editingCert.name}` : 'Add New Certification'}</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Certification Name *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="AWS Certified Solutions Architect"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Issuing Organization *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Amazon Web Services"
                value={formData.issuingOrganization}
                onChange={(e) => setFormData({ ...formData, issuingOrganization: e.target.value })}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-semibold">Issue Date / Year *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="2024 (or Nov 2024)"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-semibold">Certificate ID / License #</label>
              <input
                type="text"
                className="form-control"
                placeholder="AWS-SAA-102938"
                value={formData.certificateId}
                onChange={(e) => setFormData({ ...formData, certificateId: e.target.value })}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-semibold">Verification URL</label>
              <input
                type="url"
                className="form-control"
                placeholder="https://aws.amazon.com/verify..."
                value={formData.certificateUrl}
                onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })}
              />
            </div>

            <div className="col-12 d-flex gap-2 pt-2">
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-4 shadow-sm d-inline-flex align-items-center gap-2"
                disabled={saving}
              >
                {saving && <span className="spinner-border spinner-border-sm" role="status"></span>}
                <span>{editingCert ? 'Save Certification' : 'Add Certification'}</span>
              </button>
              {editingCert && (
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
          <span>Active Certifications ({certifications.length})</span>
          <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={fetchCerts}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
        </h2>

        {loading ? (
          <LoadingSpinner message="Refreshing certifications..." />
        ) : certifications.length === 0 ? (
          <div className="text-center py-4 text-body-secondary small">
            No certifications found. Add one above.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Certification</th>
                  <th>Issuer</th>
                  <th>Issued</th>
                  <th>ID</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {certifications.map((cert) => (
                  <tr key={cert._id}>
                    <td className="fw-bold">{cert.name}</td>
                    <td>{cert.issuingOrganization}</td>
                    <td>{cert.issueDate}</td>
                    <td><code>{cert.certificateId || '-'}</code></td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" title="Edit" onClick={() => handleEdit(cert)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" title="Delete" onClick={() => setCertToDelete(cert)}>
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
        show={!!certToDelete}
        itemDescription={certToDelete?.name || 'certification'}
        onConfirm={confirmDelete}
        onCancel={() => setCertToDelete(null)}
        loading={deleting}
      />
    </div>
  );
};
