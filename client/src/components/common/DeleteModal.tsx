import React from 'react';

interface DeleteModalProps {
  show: boolean;
  title?: string;
  itemDescription?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  title = 'Confirm Deletion',
  itemDescription = 'this item',
  onConfirm,
  onCancel,
  loading = false
}) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1060 }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content border-0 shadow rounded-4">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold text-danger d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <span>{title}</span>
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onCancel}
              disabled={loading}
            ></button>
          </div>
          <div className="modal-body py-3">
            <p className="mb-0 text-body-secondary">
              Are you sure you want to permanently delete <strong>{itemDescription}</strong>? This action cannot be undone.
            </p>
          </div>
          <div className="modal-footer border-0 pt-0">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill px-4"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger rounded-pill px-4 d-inline-flex align-items-center gap-2"
              onClick={onConfirm}
              disabled={loading}
            >
              {loading && <span className="spinner-border spinner-border-sm" role="status"></span>}
              <span>Delete Permanently</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
