import React from 'react';
import { Education as EducationType } from '../types';

interface EducationProps {
  education?: EducationType[];
}

const defaultEducation: EducationType[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of California, Berkeley',
    college: 'University of California, Berkeley',
    startYear: '2020',
    endYear: '2024',
    year: '2020 - 2024',
    description: 'Graduated with Honors. Specialized in Distributed Computing, Cloud Microservices, Human-Computer Interaction, and Modern Database Architecture.'
  },
  {
    degree: 'Full-Stack Software Engineering Immersion',
    institution: 'Tech Innovators Academy',
    college: 'Tech Innovators Academy',
    startYear: '2019',
    endYear: '2020',
    year: '2019 - 2020',
    description: 'Rigorous 1000-hour engineering curriculum focused on modern JavaScript/TypeScript, MERN stack, data structures, and production CI/CD.'
  }
];

export const Education: React.FC<EducationProps> = ({ education = defaultEducation }) => {
  const activeEducation = education.length > 0 ? education : defaultEducation;

  return (
    <section id="education" className="py-5 bg-body-tertiary">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Academic Background
          </span>
          <h2 className="display-6 fw-bold">Education & Credentials</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '600px' }}>
            Foundational computer science education, specialized coursework, and hands-on software development training.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {activeEducation.map((edu, index) => (
            <div key={index} className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm portfolio-card p-4">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="badge bg-primary-subtle text-primary p-3 rounded-4 fs-3">
                      <i className="bi bi-mortarboard-fill"></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-baseline flex-wrap gap-2">
                        <h3 className="h5 fw-bold mb-1 text-primary">{edu.degree}</h3>
                        <span className="badge bg-body-secondary text-body-secondary border rounded-pill px-3 py-1">
                          {edu.year || `${edu.startYear} - ${edu.endYear}`}
                        </span>
                      </div>
                      <h4 className="h6 text-body-emphasis mb-0 d-flex align-items-center gap-1">
                        <i className="bi bi-geo-alt-fill text-danger small"></i>
                        <span>{edu.college || edu.institution}</span>
                      </h4>
                    </div>
                  </div>

                  <p className="text-body-secondary small lh-base mb-0 mt-2 border-top pt-3">
                    {edu.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
