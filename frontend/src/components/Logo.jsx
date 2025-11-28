import React from 'react';

const Logo = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  return (
    <img 
      src="https://customer-assets.emergentagent.com/job_quickpay-app-11/artifacts/c2t3lh84_PalmPe%20transparent.png"
      alt="PalmPay Logo"
      className={`${sizes[size]} ${className} object-contain`}
    />
  );
};

export default Logo;