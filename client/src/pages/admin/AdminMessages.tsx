import React, { useState, useEffect } from 'react';
import { ContactMessage } from '../../types';
import { messageService } from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AlertBanner } from '../../components/common/AlertBanner';
import { DeleteModal } from '../../components/common/DeleteModal';

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // View modal
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  // Delete modal
  const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await messageService.getAll();
      setMessages(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch contact messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead && msg._id) {
      try {
        await messageService.markRead(msg._id);
        // Update local state
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, isRead: true } : m))
        );
      } catch {
        // Ignore read marking failure
      }
    }
  };

  const confirmDelete = async () => {
    if (!messageToDelete?._id) return;
    setDeleting(true);
    try {
      await messageService.delete(messageToDelete._id);
      setSuccess(`Message from "${messageToDelete.name}" deleted.`);
      setMessageToDelete(null);
      if (selectedMessage?._id === messageToDelete._id) setSelectedMessage(null);
      await fetchMessages();
    } catch (err: any) {
      setError(err.message || 'Failed to delete message');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Received Contact Inquiries</h1>
        <p className="text-body-secondary small mb-0">
          Messages submitted by visitors through the public portfolio contact form, stored in MongoDB.
        </p>
      </div>

      <AlertBanner type="success" message={success} onClose={() => setSuccess(null)} />
      <AlertBanner type="danger" message={error} onClose={() => setError(null)} />

      <div className="card border-0 shadow-sm portfolio-card p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h5 fw-bold mb-0">Inbox ({messages.length})</h2>
          <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={fetchMessages}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh Inbox
          </button>
        </div>

        {loading ? (
          <LoadingSpinner message="Checking messages..." />
        ) : messages.length === 0 ? (
          <div className="text-center py-5 text-body-secondary">
            <i className="bi bi-inbox display-3 mb-3 d-block text-body-secondary"></i>
            <h6>Your inbox is currently empty</h6>
            <p className="small mb-0">Inquiries submitted on the contact page will automatically show up here.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Sender</th>
                  <th>Contact Info</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg._id} className={!msg.isRead ? 'table-primary table-opacity-10 fw-medium' : ''}>
                    <td>
                      {msg.isRead ? (
                        <span className="badge bg-secondary-subtle text-secondary">Read</span>
                      ) : (
                        <span className="badge bg-danger">Unread</span>
                      )}
                    </td>
                    <td className="fw-bold">{msg.name}</td>
                    <td>
                      <div>
                        <a href={`mailto:${msg.email}`} className="text-decoration-none small">
                          {msg.email}
                        </a>
                      </div>
                      {msg.phone && <div className="text-body-secondary small">{msg.phone}</div>}
                    </td>
                    <td className="text-truncate" style={{ maxWidth: '220px' }}>
                      {msg.subject}
                    </td>
                    <td className="small text-body-secondary">
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          title="Read Message"
                          onClick={() => handleOpenMessage(msg)}
                        >
                          <i className="bi bi-eye"></i> View
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          title="Delete"
                          onClick={() => setMessageToDelete(msg)}
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

      {/* Message Reader Modal */}
      {selectedMessage && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1055 }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow rounded-4">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                  <i className="bi bi-envelope-open text-primary"></i>
                  <span>{selectedMessage.subject}</span>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedMessage(null)}
                ></button>
              </div>
              <div className="modal-body py-4">
                <div className="row g-2 mb-3 pb-3 border-bottom small text-body-secondary">
                  <div className="col-sm-6">
                    <strong>From:</strong> {selectedMessage.name} &lt;{selectedMessage.email}&gt;
                  </div>
                  {selectedMessage.phone && (
                    <div className="col-sm-6">
                      <strong>Phone:</strong> {selectedMessage.phone}
                    </div>
                  )}
                  <div className="col-12">
                    <strong>Received:</strong>{' '}
                    {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : 'N/A'}
                  </div>
                </div>

                <div className="p-3 bg-body-tertiary rounded-3 lh-base">
                  <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="btn btn-primary rounded-pill px-4"
                >
                  <i className="bi bi-reply-fill me-1"></i> Reply via Email
                </a>
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={() => setSelectedMessage(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        show={!!messageToDelete}
        itemDescription={messageToDelete ? `message from ${messageToDelete.name}` : 'message'}
        onConfirm={confirmDelete}
        onCancel={() => setMessageToDelete(null)}
        loading={deleting}
      />
    </div>
  );
};
