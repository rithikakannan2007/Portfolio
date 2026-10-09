import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { projectService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AlertBanner } from '../../components/common/AlertBanner';
import { DeleteModal } from '../../components/common/DeleteModal';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    technologies: string;
    image: string;
    githubUrl: string;
    liveUrl: string;
    category: string;
    featured: boolean;
  }>({
    title: '',
    description: '',
    technologies: '',
    image: '',
    githubUrl: '',
    liveUrl: '',
    category: 'Full-Stack',
    featured: false
  });

  // Delete State
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAll();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (proj: Project) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      description: proj.description,
      technologies: proj.technologies.join(', '),
      image: proj.image,
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      category: proj.category || 'Full-Stack',
      featured: !!proj.featured
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      image: '',
      githubUrl: '',
      liveUrl: '',
      category: 'Full-Stack',
      featured: false
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSaving(true);

    const techArray = formData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (techArray.length === 0) {
      setError('Please provide at least one technology (comma-separated).');
      setSaving(false);
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      technologies: techArray,
      image: formData.image,
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl,
      category: formData.category,
      featured: formData.featured
    };

    try {
      if (editingProject?._id) {
        await projectService.update(editingProject._id, payload);
        setSuccess(`Project "${payload.title}" updated successfully!`);
      } else {
        await projectService.create(payload);
        setSuccess(`Project "${payload.title}" added to MongoDB and visible on public page!`);
      }
      handleCancel();
      await fetchProjects();
    } catch (err: any) {
      setError(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!projectToDelete?._id) return;
    setDeleting(true);
    try {
      await projectService.delete(projectToDelete._id);
      setSuccess(`Project "${projectToDelete.title}" deleted successfully.`);
      setProjectToDelete(null);
      await fetchProjects();
    } catch (err: any) {
      setError(err.message || 'Failed to delete project');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Manage Portfolio Projects</h1>
        <p className="text-body-secondary small mb-0">
          Create, edit, and organize dynamic project showcase items stored in MongoDB.
        </p>
      </div>

      <AlertBanner type="success" message={success} onClose={() => setSuccess(null)} />
      <AlertBanner type="danger" message={error} onClose={() => setError(null)} />

      {/* Add / Edit Project Form */}
      <div className="card border-0 shadow-sm portfolio-card p-4 mb-4">
        <h2 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-folder-plus text-primary"></i>
          <span>{editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Project'}</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Project Title *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="e.g. Used Products Marketplace"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label small fw-semibold">Category *</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Full-Stack">Full-Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Mobile">Mobile</option>
                <option value="IoT">IoT</option>
                <option value="AI / ML">AI / ML</option>
              </select>
            </div>

            <div className="col-md-3 d-flex align-items-center pt-md-4">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="featuredSwitch"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <label className="form-check-label small fw-semibold" htmlFor="featuredSwitch">
                  Featured on Home
                </label>
              </div>
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Project Image URL *</label>
              <input
                type="url"
                required
                className="form-control"
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">Description *</label>
              <textarea
                required
                rows={3}
                className="form-control"
                placeholder="Explain the goals, problem solved, architecture, and features..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div className="col-12">
              <label className="form-label small fw-semibold">
                Technologies Used (Comma-separated) *
              </label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="React, TypeScript, Node.js, Express, MongoDB, Bootstrap"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">GitHub Repository URL</label>
              <input
                type="url"
                className="form-control"
                placeholder="https://github.com/username/project"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold">Live Demo URL</label>
              <input
                type="url"
                className="form-control"
                placeholder="https://my-app.example.com"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              />
            </div>

            <div className="col-12 d-flex gap-2 pt-2">
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-4 shadow-sm d-inline-flex align-items-center gap-2"
                disabled={saving}
              >
                {saving && <span className="spinner-border spinner-border-sm" role="status"></span>}
                <span>{editingProject ? 'Save Changes' : 'Publish Project'}</span>
              </button>
              {editingProject && (
                <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={handleCancel}>
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Projects Table Card */}
      <div className="card border-0 shadow-sm portfolio-card p-4">
        <h2 className="h5 fw-bold mb-3 d-flex align-items-center justify-content-between">
          <span>Active Projects ({projects.length})</span>
          <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={fetchProjects}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
        </h2>

        {loading ? (
          <LoadingSpinner message="Refreshing projects..." />
        ) : projects.length === 0 ? (
          <div className="text-center py-4 text-body-secondary small">
            No projects found in MongoDB. Create your first project using the form above.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Title & Category</th>
                  <th>Technologies</th>
                  <th>Links</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr key={proj._id}>
                    <td style={{ width: '80px' }}>
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="rounded-3 object-fit-cover shadow-sm"
                        style={{ width: '60px', height: '45px' }}
                      />
                    </td>
                    <td>
                      <div className="fw-bold">{proj.title}</div>
                      <span className="badge bg-secondary-subtle text-secondary-emphasis small">
                        {proj.category || 'Full-Stack'}
                      </span>
                      {proj.featured && <span className="badge bg-warning-subtle text-warning-emphasis ms-1">Featured</span>}
                    </td>
                    <td style={{ maxWidth: '250px' }}>
                      <div className="d-flex flex-wrap gap-1">
                        {proj.technologies.slice(0, 3).map((t, idx) => (
                          <span key={idx} className="badge bg-body-secondary text-body-secondary border tech-badge">
                            {t}
                          </span>
                        ))}
                        {proj.technologies.length > 3 && (
                          <span className="badge bg-body-secondary text-body-secondary border">
                            +{proj.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary rounded-circle" title="GitHub">
                            <i className="bi bi-github"></i>
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary rounded-circle" title="Live Demo">
                            <i className="bi bi-box-arrow-up-right"></i>
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" title="Edit" onClick={() => handleEdit(proj)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" title="Delete" onClick={() => setProjectToDelete(proj)}>
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
        show={!!projectToDelete}
        itemDescription={projectToDelete?.title || 'project'}
        onConfirm={confirmDelete}
        onCancel={() => setProjectToDelete(null)}
        loading={deleting}
      />
    </div>
  );
};
