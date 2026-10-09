import React, { useState, useEffect } from 'react';
import { Skill } from '../../types';
import { skillService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const SkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await skillService.getAll();
        setSkills(data);
      } catch (err) {
        console.error('Failed to load skills:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) return <LoadingSpinner message="Retrieving skills from MongoDB..." />;

  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category || 'General')))];

  const filteredSkills = skills.filter((skill) => {
    const matchesCat = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Expertise & Technologies
          </span>
          <h1 className="display-5 fw-bold">Skills & Proficiencies</h1>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            All technical competencies, frameworks, tools, and languages retrieved dynamically from MongoDB.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="row g-3 justify-content-between align-items-center mb-4">
          <div className="col-md-8">
            <div className="d-flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`btn btn-sm rounded-pill px-3 ${
                    selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary'
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-body border-end-0">
                <i className="bi bi-search text-body-secondary"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Skills Cards Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-5 card border-0 shadow-sm p-5">
            <i className="bi bi-code-slash display-3 text-body-secondary mb-3"></i>
            <h5>No skills matched your search</h5>
            <p className="text-body-secondary">Try searching for a different keyword or resetting categories.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredSkills.map((skill) => (
              <div key={skill._id || skill.name} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm portfolio-card p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <div className="badge bg-primary-subtle text-primary p-2 rounded-3 fs-5">
                        <i className={`bi bi-${skill.icon || 'check-circle'}`}></i>
                      </div>
                      <div>
                        <h3 className="h6 fw-bold mb-0">{skill.name}</h3>
                        <small className="text-body-secondary">{skill.category}</small>
                      </div>
                    </div>
                    <span className="badge bg-primary text-white fs-6 fw-bold">{skill.percentage}%</span>
                  </div>

                  <div className="progress mt-3" style={{ height: '8px' }}>
                    <div
                      className="progress-bar bg-gradient bg-primary"
                      role="progressbar"
                      style={{ width: `${skill.percentage}%` }}
                      aria-valuenow={skill.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
