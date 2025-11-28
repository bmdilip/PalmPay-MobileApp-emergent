import React from 'react';

const Logo = ({ className = '', size = 'md', withGlow = false }) => {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20'
  };

  return (
    <div className={`relative ${className}`}>
      {withGlow && (
        <div className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-[#586BFF] to-[#9B62FF]" style={{ transform: 'scale(1.5)' }}></div>
      )}
      <img 
        src="https://customer-assets.emergentagent.com/job_quickpay-app-11/artifacts/c2t3lh84_PalmPe%20transparent.png"
        alt="PalmPay Logo"
        className={`${sizes[size]} object-contain relative z-10 rounded-2xl`}
        style={{ 
          filter: 'drop-shadow(0 0 20px rgba(88, 107, 255, 0.4))',
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
};

export default Logo;