import React from 'react';
import './LoadingState.css';

const LoadingState = ({ message = 'Loading...', inline = false }) => {
  return (
    <div className={inline ? 'loading-inline' : 'loading-container'}>
      <div className="loading-spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingState; 