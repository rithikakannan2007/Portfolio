import React, { useState, useEffect } from 'react';
import { Skill } from '../../types';
import { skillService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AlertBanner } from '../../components/common/AlertBanner';
import { DeleteModal } from '../../components/common/DeleteModal';

export const AdminSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    percentage: number;
    icon: string;
  }>({
    name: '',
    category: 'Frontend',
    percentage: 85,
    icon: 'check-circle'
  });

  // Delete Modal State
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await skillService.getAll();
      setSkills(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleEditClick = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      percentage: skill.percentage,
      icon: skill.icon || 'check-circle'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'Frontend',
      percentage: 85,
      icon: 'check-circle'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setSaving(true);

    try {
      if (editingSkill?._id) {
        await skillService.update(editingSkill._id, formData);
        setSuccess(`Skill "${formData.name}" updated successfully!`);
      } else {
        await skillService.create(formData);
        setSuccess(`Skill "${formData.name}" added successfully!`);
      }
      handleCancelEdit();
      await fetchSkills();
    } catch (err: any) {
      setError(err.message || 'Failed to save skill');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!skillToDelete?._id) return;
    setDeleting(true);
    try {
      await skillService.delete(skillToDelete._id);
      setSuccess(`Skill "${skillToDelete.name}" deleted successfully.`);
      setSkillToDelete(null);
      await fetchSkills();
    } catch (err: any) {
      setError(err.message || 'Failed to delete skill');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Manage Skills & Proficiencies</h1>
        <p className="text-body-secondary small mb-0">
          Add new technologies, adjust proficiency percentages, and organize technical skill categories.
        </p>
      </div>

      <AlertBanner type="success" message={success} onClose={() => setSuccess(null)} />
      <AlertBanner type="danger" message={error} onClose={() => setError(null)} />

      {/* Add / Edit Form Card */}
      <div className="card border-0 shadow-sm portfolio-card p-4 mb-4">
        <h2 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
          <i className="bi bi-plus-circle text-primary"></i>
          <span>{editingSkill ? `Edit Skill: ${editingSkill.name}` : 'Add New Skill'}</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-semibold">Skill Name *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="e.g. React, TypeScript, Docker"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label small fw-semibold">Category *</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Languages">Languages</option>
                <option value="Databases">Databases</option>
                <option value="Tools">Tools</option>
                <option value="DevOps">DevOps</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label small fw-semibold">
                Proficiency Level ({formData.percentage}%) *
              </label>
              <input
                type="range"
                className="form-range mt-2"
                min="10"
                max="100"
                step="5"
                value={formData.percentage}
                onChange={(e) => setFormData({ ...formData, percentage: Number(e.target.value) })}
              />
            </div>

            <div className="col-md-2">
              <label className="form-label small fw-semibold">Icon (Bootstrap)</label>
              <input
                type="text"
                className="form-control"
                placeholder="code-slash"
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
                <span>{editingSkill ? 'Save Changes' : 'Add Skill'}</span>
              </button>
              {editingSkill && (
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={handleCancelEdit}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Skills Table Card */}
      <div className="card border-0 shadow-sm portfolio-card p-4">
        <h2 className="h5 fw-bold mb-3 d-flex align-items-center justify-content-between">
          <span>Existing Skills ({skills.length})</span>
          <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={fetchSkills}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
        </h2>

        {loading ? (
          <LoadingSpinner message="Refreshing skills..." />
        ) : skills.length === 0 ? (
          <div className="text-center py-4 text-body-secondary small">
            No skills added yet. Use the form above to add your first skill!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Skill</th>
                  <th>Category</th>
                  <th>Proficiency</th>
                  <th>Level Bar</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill._id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <i className={`bi bi-${skill.icon || 'check-circle'} text-primary`}></i>
                        <span className="fw-bold">{skill.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-3">
                        {skill.category}
                      </span>
                    </td>
                    <td className="fw-semibold">{skill.percentage}%</td>
                    <td style={{ width: '25%' }}>
                      <div className="progress" style={{ height: '6px' }}>
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: `${skill.percentage}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          title="Edit Skill"
                          onClick={() => handleEditClick(skill)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          title="Delete Skill"
                          onClick={() => setSkillToDelete(skill)}
                        >
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

      {/* Delete Confirmation Modal */}
      <DeleteModal
        show={!!skillToDelete}
        itemDescription={skillToDelete?.name || 'skill'}
        onConfirm={confirmDelete}
        onCancel={() => setSkillToDelete(null)}
        loading={deleting}
      />
    </div>
  );
};
