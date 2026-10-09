import React from 'react';

interface AlertBannerProps {
  type: 'success' | 'danger' | 'info' | 'warning';
  message: string | null;
  onClose?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ type, message, onClose }) => {
  if (!message) return null;

  const icon =
    type === 'success'
      ? 'bi-check-circle-fill'
      : type === 'danger'
      ? 'bi-exclamation-triangle-fill'
      : type === 'warning'
      ? 'bi-exclamation-circle-fill'
      : 'bi-info-circle-fill';

  return (
    <div className={`alert alert-${type} alert-dismissible fade show d-flex align-items-center gap-2 rounded-3 shadow-sm mb-4`} role="alert">
      <i className={`bi ${icon} fs-5`}></i>
      <div className="flex-grow-1 small fw-medium">{message}</div>
      {onClose && (
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      )}
    </div>
  );
};
