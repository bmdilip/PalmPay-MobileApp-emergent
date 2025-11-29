import React from 'react';
import './ShimmerLoader.css';

const ShimmerLoader = ({ count = 3, height = '80px', className = '' }) => {
  return (
    <div className={`shimmer-container ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="shimmer-card"
          style={{ height }}
        />
      ))}
    </div>
  );
};

export const Spinner = ({ size = 24, className = '' }) => {
  return (
    <div
      className={`spinner ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: `${Math.max(2, size / 8)}px solid #E5E7EB`,
        borderTop: `${Math.max(2, size / 8)}px solid #00C8D6`,
        borderRadius: '50%'
      }}
    />
  );
};

export const ProgressBar = ({ progress = 50, className = '', height = '4px' }) => {
  return (
    <div className={`progress-bar ${className}`} style={{ height }}>
      <div
        className="progress-fill"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};

export default ShimmerLoader;