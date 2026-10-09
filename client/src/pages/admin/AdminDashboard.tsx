import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardStats, ContactMessage } from '../../types';
import { dashboardService, messageService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const [statsData, messagesData] = await Promise.all([
          dashboardService.getStats(),
          messageService.getAll()
        ]);
        setStats(statsData);
        setRecentMessages(messagesData.slice(0, 5));
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <LoadingSpinner message="Calculating portfolio metrics..." />;

  const statCards = [
    { title: 'Total Projects', count: stats?.totalProjects || 0, icon: 'folder-check', color: 'primary', link: '/admin/projects' },
    { title: 'Total Skills', count: stats?.totalSkills || 0, icon: 'code-square', color: 'success', link: '/admin/skills' },
    { title: 'Certifications', count: stats?.totalCertifications || 0, icon: 'award', color: 'info', link: '/admin/certifications' },
    { title: 'Work Experience', count: stats?.totalExperience || 0, icon: 'briefcase', color: 'warning', link: '/admin/experience' },
    { title: 'Education Records', count: stats?.totalEducation || 0, icon: 'mortarboard', color: 'secondary', link: '/admin/education' },
    { title: 'Total Services', count: stats?.totalServices || 0, icon: 'laptop', color: 'primary', link: '/admin/services' },
    { title: 'Achievements', count: stats?.totalAchievements || 0, icon: 'trophy', color: 'warning', link: '/admin/achievements' },
    { title: 'Contact Messages', count: stats?.totalMessages || 0, unread: stats?.unreadMessages || 0, icon: 'envelope', color: 'danger', link: '/admin/messages' }
  ];

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h3 fw-bold mb-1">Portfolio Dashboard Overview</h1>
          <p className="text-body-secondary small mb-0">
            Real-time status of your dynamic portfolio collections in MongoDB.
          </p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/admin/projects" className="btn btn-primary btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1 shadow-sm">
            <i className="bi bi-plus-lg"></i>
            <span>Add Project</span>
          </Link>
          <Link to="/admin/skills" className="btn btn-outline-primary btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1">
            <i className="bi bi-plus-lg"></i>
            <span>Add Skill</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="row g-3 mb-4">
        {statCards.map((card, idx) => (
          <div key={idx} className="col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm portfolio-card p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-body-secondary small fw-medium mb-1">{card.title}</div>
                  <div className="h3 fw-bold mb-0">{card.count}</div>
                  {card.unread !== undefined && card.unread > 0 && (
                    <span className="badge bg-danger rounded-pill mt-1 small">
                      {card.unread} unread
                    </span>
                  )}
                </div>
                <div className={`badge bg-${card.color}-subtle text-${card.color} p-3 rounded-4 fs-4`}>
                  <i className={`bi bi-${card.icon}`}></i>
                </div>
              </div>
              <div className="border-top pt-2 mt-3 text-end">
                <Link to={card.link} className="small text-decoration-none fw-medium text-primary">
                  Manage <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Messages & Quick CMS Controls */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm portfolio-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h5 fw-bold mb-0 d-flex align-items-center gap-2">
                <i className="bi bi-chat-left-dots text-primary"></i>
                <span>Recent Inquiries</span>
              </h2>
              <Link to="/admin/messages" className="small text-decoration-none fw-medium">
                View All ({stats?.totalMessages || 0})
              </Link>
            </div>

            {recentMessages.length === 0 ? (
              <div className="text-center py-4 text-body-secondary small">
                No contact messages received yet.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 small">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Sender</th>
                      <th>Subject</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentMessages.map((msg) => (
                      <tr key={msg._id}>
                        <td>
                          {msg.isRead ? (
                            <span className="badge bg-secondary-subtle text-secondary">Read</span>
                          ) : (
                            <span className="badge bg-danger">New</span>
                          )}
                        </td>
                        <td>
                          <div className="fw-bold">{msg.name}</div>
                          <div className="text-body-secondary" style={{ fontSize: '0.72rem' }}>{msg.email}</div>
                        </td>
                        <td className="fw-medium text-truncate" style={{ maxWidth: '140px' }}>{msg.subject}</td>
                        <td className="text-body-secondary text-truncate" style={{ maxWidth: '200px' }}>{msg.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm portfolio-card p-4 h-100">
            <h2 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-lightning-charge text-warning"></i>
              <span>Quick Navigation</span>
            </h2>
            <div className="d-flex flex-column gap-2 small">
              <Link to="/admin/profile" className="btn btn-outline-secondary text-start py-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                <span><i className="bi bi-person me-2 text-primary"></i> Edit Profile & Photo</span>
                <i className="bi bi-chevron-right text-muted"></i>
              </Link>
              <Link to="/admin/about" className="btn btn-outline-secondary text-start py-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                <span><i className="bi bi-file-person me-2 text-primary"></i> Edit About Me & Objective</span>
                <i className="bi bi-chevron-right text-muted"></i>
              </Link>
              <Link to="/admin/resume" className="btn btn-outline-secondary text-start py-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                <span><i className="bi bi-file-earmark-pdf me-2 text-primary"></i> Update Resume Link</span>
                <i className="bi bi-chevron-right text-muted"></i>
              </Link>
              <Link to="/admin/social-links" className="btn btn-outline-secondary text-start py-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                <span><i className="bi bi-share me-2 text-primary"></i> Manage Social Links</span>
                <i className="bi bi-chevron-right text-muted"></i>
              </Link>
              <Link to="/admin/settings" className="btn btn-outline-secondary text-start py-2 px-3 rounded-3 d-flex align-items-center justify-content-between">
                <span><i className="bi bi-gear me-2 text-primary"></i> Portfolio Settings</span>
                <i className="bi bi-chevron-right text-muted"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
