import React, { useState, useEffect } from 'react';
import { ContactMessage, Profile } from '../../types';
import { messageService, profileService } from '../../services/api';
import { AlertBanner } from '../../components/common/AlertBanner';

export const ContactPage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    profileService.get().then(setProfile).catch(() => {});
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!validate()) return;

    try {
      setLoading(true);
      const res = await messageService.send(formData);
      if (res.success) {
        setSuccessMsg('Your message has been sent successfully! Stored directly in MongoDB.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to deliver message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Let's Talk
          </span>
          <h1 className="display-5 fw-bold">Get In Touch</h1>
          <p className="text-body-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Have a project, job inquiry, or general question? Send a message and it will be delivered directly to the Admin Dashboard.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Contact Details Card */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm portfolio-card p-4 h-100">
              <h2 className="h4 fw-bold mb-4 text-primary d-flex align-items-center gap-2">
                <i className="bi bi-chat-quote-fill"></i>
                <span>Direct Contact</span>
              </h2>

              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="badge bg-primary-subtle text-primary p-3 rounded-4 fs-4">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-0">Location</h3>
                    <p className="text-body-secondary small mb-0">{profile?.location || 'San Francisco, CA'}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="badge bg-primary-subtle text-primary p-3 rounded-4 fs-4">
                    <i className="bi bi-envelope-fill"></i>
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-0">Email</h3>
                    <p className="text-body-secondary small mb-0">{profile?.email || 'admin@portfolio.com'}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="badge bg-primary-subtle text-primary p-3 rounded-4 fs-4">
                    <i className="bi bi-telephone-fill"></i>
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-0">Phone</h3>
                    <p className="text-body-secondary small mb-0">{profile?.phone || '+1 (555) 382-9104'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm portfolio-card p-4 p-md-5">
              <AlertBanner type="success" message={successMsg} onClose={() => setSuccessMsg(null)} />
              <AlertBanner type="danger" message={errorMsg} onClose={() => setErrorMsg(null)} />

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Phone Number (Optional)</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                      placeholder="Project Opportunity"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      placeholder="Tell me about your project or inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  </div>

                  <div className="col-12 text-center pt-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm d-inline-flex align-items-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status"></span>
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
    </div>
  );
};
