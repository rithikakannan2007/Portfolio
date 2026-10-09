import React from 'react';
import { Skill } from '../types';

interface SkillsProps {
  skills?: Skill[];
}

const defaultSkills: Skill[] = [
  { name: 'HTML5', category: 'Frontend', percentage: 95, level: 95, icon: 'code-slash' },
  { name: 'CSS3', category: 'Frontend', percentage: 90, level: 90, icon: 'palette' },
  { name: 'JavaScript', category: 'Languages', percentage: 95, level: 95, icon: 'filetype-js' },
  { name: 'TypeScript', category: 'Languages', percentage: 90, level: 90, icon: 'filetype-tsx' },
  { name: 'React', category: 'Frontend', percentage: 92, level: 92, icon: 'layers' },
  { name: 'Bootstrap', category: 'Frontend', percentage: 90, level: 90, icon: 'bootstrap' },
  { name: 'Node.js', category: 'Backend', percentage: 88, level: 88, icon: 'hdd-network' },
  { name: 'Express.js', category: 'Backend', percentage: 88, level: 88, icon: 'server' },
  { name: 'MongoDB', category: 'Databases', percentage: 85, level: 85, icon: 'database' },
  { name: 'Git', category: 'Tools', percentage: 92, level: 92, icon: 'git' },
  { name: 'REST API', category: 'Backend', percentage: 95, level: 95, icon: 'arrow-left-right' }
];

export const Skills: React.FC<SkillsProps> = ({ skills = defaultSkills }) => {
  const activeSkills = skills.length > 0 ? skills : defaultSkills;

  const categories = Array.from(new Set(activeSkills.map((s) => s.category || 'General')));

  return (
    <section id="skills" className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Technical Stack
          </span>
          <h2 className="display-6 fw-bold">Skills & Proficiencies</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '600px' }}>
            A proven set of technologies, frameworks, and methodologies I leverage to design robust web applications.
          </p>
        </div>

        <div className="row g-4 mb-4">
          {categories.map((category) => {
            const categorySkills = activeSkills.filter((s) => (s.category || 'General') === category);
            return (
              <div key={category} className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm portfolio-card p-3">
                  <div className="card-body">
                    <h3 className="h5 fw-bold mb-3 d-flex align-items-center gap-2 text-primary">
                      <i className="bi bi-code-square"></i>
                      <span>{category}</span>
                    </h3>
                    <div className="d-flex flex-wrap gap-2">
                      {categorySkills.map((s) => (
                        <span key={s.name} className="badge bg-body-secondary text-body-emphasis tech-badge border">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="card border-0 shadow-sm portfolio-card p-4 p-md-5">
          <h3 className="h5 fw-bold mb-4">Proficiency Breakdown</h3>
          <div className="row g-4">
            {activeSkills.map((skill) => {
              const val = skill.percentage || skill.level || 85;
              return (
                <div key={skill.name} className="col-md-6">
                  <div className="mb-2 d-flex justify-content-between align-items-center">
                    <span className="fw-semibold small d-flex align-items-center gap-2">
                      <i className={`bi bi-${skill.icon || 'check2'} text-primary`}></i>
                      {skill.name}
                    </span>
                    <span className="text-body-secondary small fw-bold">{val}%</span>
                  </div>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label={skill.name}
                    aria-valuenow={val}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ height: '8px' }}
                  >
                    <div
                      className="progress-bar bg-gradient bg-primary"
                      style={{ width: `${val}%`, transition: 'width 1s ease' }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
