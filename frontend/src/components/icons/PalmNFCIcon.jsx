import React from 'react';

/**
 * PalmNFC Icon Component
 * Uses the custom palm NFC icon image provided by user
 * Beautiful teal circular background with white palm and NFC waves
 */
const PalmNFCIcon = ({ className = "w-6 h-6", style = {} }) => {
  return (
    <img 
      src="https://customer-assets.emergentagent.com/job_app-evolution-40/artifacts/x6mhfodb_Untitled-20251210-135208-9784.png"
      alt="Palm NFC Icon"
      className={className}
      style={style}
    />
  );
};

export default PalmNFCIcon;
