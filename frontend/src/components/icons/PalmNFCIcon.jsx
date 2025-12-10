import React from 'react';

/**
 * PalmNFC Icon Component
 * Uses the custom palm NFC icon image provided by user
 */
const PalmNFCIcon = ({ className = "w-6 h-6", style = {} }) => {
  return (
    <img 
      src="https://customer-assets.emergentagent.com/job_app-evolution-40/artifacts/lyybrifz_PNFC%20transparent%20grey%20icons%202%20.png"
      alt="Palm NFC Icon"
      className={className}
      style={style}
    />
  );
};

export default PalmNFCIcon;
