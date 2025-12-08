import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 'md', variant = 'full', withGlow = false, className = '' }) => {
  // Logo URLs from provided assets
  const logos = {
    full: 'https://customer-assets.emergentagent.com/job_premium-finance-ui/artifacts/6fr07bb9_PalmPe%20Logo%20-%20Transparent.png',
    text: 'https://customer-assets.emergentagent.com/job_premium-finance-ui/artifacts/2qrgpzdu_Palmpe%20-%20Transparent.png',
    mark: 'https://customer-assets.emergentagent.com/job_premium-finance-ui/artifacts/nvu73z5s_Brand%20Mark%20Transparent.png'
  };

  const sizeClasses = {
    xs: 'h-6',
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const logoUrl = logos[variant] || logos.full;

  return (
    <motion.div
      className={`inline-flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {withGlow ? (
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-xl opacity-60">
            <img 
              src={logoUrl} 
              alt="PalmPe Logo" 
              className={sizeClasses[size]}
              style={{ filter: 'brightness(1.5)' }}
            />
          </div>
          {/* Actual logo */}
          <img 
            src={logoUrl} 
            alt="PalmPe Logo" 
            className={`relative ${sizeClasses[size]}`}
          />
        </div>
      ) : (
        <img 
          src={logoUrl} 
          alt="PalmPe Logo" 
          className={sizeClasses[size]}
        />
      )}
    </motion.div>
  );
};

export default Logo;
