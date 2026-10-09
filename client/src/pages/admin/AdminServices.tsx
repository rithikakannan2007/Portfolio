import React, { useState, useEffect } from 'react';
import { Service } from '../../types';
import { serviceService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AlertBanner } from '../../components/common/AlertBanner';
import { DeleteModal } from '../../components/common/DeleteModal';

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    icon: string;
    features: string;
  }>({
    title: '',
    description: '',
    icon: 'laptop',
    features: ''
  });

  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await serviceService.getAll();
      setServices(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (svc: Service) => {
    setEditingService(svc);
    setFormData({
      title: svc.title,
      description: svc.description,
      icon: svc.icon || 'laptop',
      features: (svc.features || []).join(', ')
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      icon: 'laptop',
      features: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSaving(true);

    const payload = {
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      features: formData.features
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean)
    };

    try {
      if (editingService?._id) {
        await serviceService.update(editingService._id, payload);
        setSuccess(`Service "${formData.title}" updated successfully!`);
      } else {
        await serviceService.create(payload);
        setSuccess(`Service "${formData.title}" added successfully!`);
      }
      handleCancel();
      await fetchServices();
    } catch (err: any) {
      setError(err.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!serviceToDelete?._id) return;
    setDeleting(true);
    try {
      await serviceService.delete(serviceToDelete._id);
      setSuccess(`Service "${serviceToDelete.title}" removed.`);
      setServiceToDelete(null);
      await fetchServices();
    } catch (err: any) {
      setError(err.message || 'Failed to delete service');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Manage Services & Solutions</h1>
        <p className="text-body-secondary small mb-0">
          Offer consulting, frontend development, backend architecture, and design services.
        </p>
      </div>

      <AlertBanner type="success" message={success} onClose={() => setSuccess(null)} />
      <AlertBanner type="danger" message={error} onClose={() => setError(null)} />

      {/* Form */}
      <div className="card border-0 shadow-sm portfolio-card p-4 mb-4">
        <h2 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-laptop text-primary"></i>
          <span>{editingService ? `Edit Service: ${editingService.title}` : 'Add New Service'}</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label small fw-semibold">Service Title *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="e.g. Full-Stack Web Development"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-semibold">Icon (Bootstrap Icon Name)</label>
              <input
                type="text"
                className="form-control"
                placeholder="laptop, palette, hdd-network, etc."
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Description *</label>
              <textarea
                required
                rows={3}
                className="form-control"
                placeholder="Explain what value you provide to clients or employers..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">
                Key Features & Deliverables (Comma-separated)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Custom SPAs, Microservices, Security Audits, Clean Code"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              />
            </div>

            <div className="col-12 d-flex gap-2 pt-2">
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-4 shadow-sm d-inline-flex align-items-center gap-2"
                disabled={saving}
              >
                {saving && <span className="spinner-border spinner-border-sm" role="status"></span>}
                <span>{editingService ? 'Save Service' : 'Add Service'}</span>
              </button>
              {editingService && (
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
          <span>Active Services ({services.length})</span>
          <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={fetchServices}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
        </h2>

        {loading ? (
          <LoadingSpinner message="Refreshing services..." />
        ) : services.length === 0 ? (
          <div className="text-center py-4 text-body-secondary small">
            No services listed yet. Add one using the form above.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Features</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((svc) => (
                  <tr key={svc._id}>
                    <td>
                      <i className={`bi bi-${svc.icon || 'laptop'} fs-4 text-primary`}></i>
                    </td>
                    <td className="fw-bold">{svc.title}</td>
                    <td className="text-body-secondary small text-truncate" style={{ maxWidth: '250px' }}>
                      {svc.description}
                    </td>
                    <td>
                      <span className="badge bg-secondary-subtle text-secondary-emphasis">
                        {(svc.features || []).length} features
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" title="Edit" onClick={() => handleEdit(svc)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" title="Delete" onClick={() => setServiceToDelete(svc)}>
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
        show={!!serviceToDelete}
        itemDescription={serviceToDelete?.title || 'service'}
        onConfirm={confirmDelete}
        onCancel={() => setServiceToDelete(null)}
        loading={deleting}
      />
    </div>
  );
};
