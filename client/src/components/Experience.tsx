import React from 'react';
import { Experience as ExperienceType } from '../types';

interface ExperienceProps {
  experience?: ExperienceType[];
}

const defaultExperience: ExperienceType[] = [
  {
    company: 'TechWave Solutions',
    position: 'Full-Stack Developer Associate',
    role: 'Full-Stack Developer Associate',
    startDate: '2024',
    endDate: 'Present',
    duration: '2024 - Present',
    description: 'Architected modern client web applications using React, TypeScript, and Bootstrap 5.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    responsibilities: [
      'Architected modern client web applications using React, TypeScript, and Bootstrap 5.',
      'Engineered scalable REST APIs in Express.js and managed MongoDB schemas with indexing optimizations.',
      'Integrated automated API documentation via OpenAPI/Swagger and streamlined backend deployment pipelines.'
    ]
  },
  {
    company: 'NextGen Innovators',
    position: 'Full-Stack Engineering Intern',
    role: 'Full-Stack Engineering Intern',
    startDate: '2023',
    endDate: '2024',
    duration: '2023 - 2024',
    description: 'Developed reusable UI component library supporting accessible dark/light themes and responsive design.',
    technologies: ['React', 'TypeScript', 'Node.js'],
    responsibilities: [
      'Developed reusable UI component library supporting accessible dark/light themes and responsive design.',
      'Implemented secure user authentication and message contact handling with input validation.',
      'Collaborated with senior engineers on RESTful microservice performance tuning and unit tests.'
    ]
  }
];

export const Experience: React.FC<ExperienceProps> = ({ experience = defaultExperience }) => {
  const activeExperience = experience.length > 0 ? experience : defaultExperience;

  return (
    <section id="experience" className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Career Journey
          </span>
          <h2 className="display-6 fw-bold">Experience & Internships</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '600px' }}>
            Roles and impact delivered across real-world product engineering environments.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="timeline-line ps-4">
              {activeExperience.map((exp, index) => (
                <div key={index} className="position-relative mb-5">
                  <div className="timeline-dot"></div>
                  <div className="card border-0 shadow-sm portfolio-card p-4">
                    <div className="card-body">
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
                        <div>
                          <h3 className="h4 fw-bold mb-1 text-primary">{exp.role || exp.position}</h3>
                          <h4 className="h6 fw-semibold text-body-emphasis mb-0 d-flex align-items-center gap-2">
                            <i className="bi bi-building"></i>
                            {exp.company}
                          </h4>
                        </div>
                        <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-3 py-2 fw-medium mt-2 mt-md-0 align-self-start align-self-md-auto">
                          <i className="bi bi-calendar-event me-1"></i>
                          {exp.duration || `${exp.startDate} - ${exp.endDate}`}
                        </span>
                      </div>

                      <div className="border-top pt-3">
                        <p className="text-body-secondary small mb-3">{exp.description}</p>
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <>
                            <h5 className="small text-uppercase fw-bold text-body-secondary mb-2">Key Highlights:</h5>
                            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                              {exp.responsibilities.map((resp: string, rIndex: number) => (
                                <li key={rIndex} className="d-flex align-items-start gap-2 text-body-secondary small">
                                  <i className="bi bi-check-circle-fill text-primary mt-1 flex-shrink-0"></i>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
