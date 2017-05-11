import React from 'react';

export const ErrorBox = ({ errorMessage }) =>
  !errorMessage ? null : (
    <div className="alert alert-danger">
      <span><strong>Error!</strong> {errorMessage}</span>
    </div>
  );

export default ErrorBox;
