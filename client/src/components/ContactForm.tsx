import React, { useState } from 'react';
import { messageService } from '../services/api';
import { ContactMessage } from '../types';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email format (e.g. name@domain.com).';
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please provide a subject line.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as the user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      const response = await messageService.send(formData);

      if (response.success) {
        setSuccessMessage(
          response.message || 'Your message has been sent and stored successfully! I will get back to you shortly.'
        );
        // Step 9: Clear the form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setErrors({});
      } else {
        setErrorMessage(response.message || 'Failed to deliver message.');
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setErrorMessage(err.message || 'Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Let's Connect
          </span>
          <h2 className="display-6 fw-bold">Get In Touch</h2>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '600px' }}>
            Have a project in mind, an opportunity, or just want to chat? Send me a message below.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm portfolio-card p-4 p-md-5">
              {/* Alert Feedback Messages */}
              {successMessage && (
                <div
                  className="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 mb-4 rounded-3"
                  role="alert"
                >
                  <i className="bi bi-check-circle-fill fs-5"></i>
                  <div>{successMessage}</div>
                  <button
                    type="button"
                    className="btn-close ms-auto"
                    aria-label="Close"
                    onClick={() => setSuccessMessage(null)}
                  ></button>
                </div>
              )}

              {errorMessage && (
                <div
                  className="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 mb-4 rounded-3"
                  role="alert"
                >
                  <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                  <div>{errorMessage}</div>
                  <button
                    type="button"
                    className="btn-close ms-auto"
                    aria-label="Close"
                    onClick={() => setErrorMessage(null)}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  {/* Name field */}
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label fw-semibold small">
                      Your Name <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-body-secondary border-end-0">
                        <i className="bi bi-person text-body-secondary"></i>
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className={`form-control border-start-0 ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label fw-semibold small">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-body-secondary border-end-0">
                        <i className="bi bi-envelope text-body-secondary"></i>
                      </span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control border-start-0 ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                    </div>
                  </div>

                  {/* Subject field */}
                  <div className="col-12">
                    <label htmlFor="subject" className="form-label fw-semibold small">
                      Subject <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-body-secondary border-end-0">
                        <i className="bi bi-chat-left-text text-body-secondary"></i>
                      </span>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className={`form-control border-start-0 ${errors.subject ? 'is-invalid' : ''}`}
                        placeholder="Regarding full-stack developer role / collaboration"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      {errors.subject && <div className="invalid-feedback d-block">{errors.subject}</div>}
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="col-12">
                    <label htmlFor="message" className="form-label fw-semibold small">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={loading}
                    ></textarea>
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  </div>

                  {/* Submit button */}
                  <div className="col-12 text-center pt-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm d-inline-flex align-items-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span>Sending to API...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <i className="bi bi-send-fill"></i>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
