import React from 'react';

export const LoadingSpinner: React.FC<{ message?: string }> = ({
  message = 'Loading dynamic data...'
}) => (
  <div className="text-center py-5 my-4">
    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
    {message && <p className="text-body-secondary mt-3 small fw-medium">{message}</p>}
  </div>
);
