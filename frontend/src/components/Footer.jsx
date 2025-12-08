import React from 'react';
import { motion } from 'framer-motion';

const Footer = ({ variant = 'light', className = '' }) => {
  return (
    <motion.footer 
      className={`text-center py-4 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <p className={`text-xs font-medium mb-1 ${
        variant === 'dark' ? 'text-white/70' : 'text-gray-600'
      }`}>
        PalmPe™ | PalmPay™
      </p>
      <p className={`text-xs ${
        variant === 'dark' ? 'text-white/50' : 'text-gray-500'
      }`}>
        © 2025 Lumioria Innovations Pvt. Ltd. All Rights Reserved.
      </p>
      <p className={`text-xs mt-1 ${
        variant === 'dark' ? 'text-white/40' : 'text-gray-400'
      }`}>
        RBI Compliant • UPI Enabled
      </p>
    </motion.footer>
  );
};

export default Footer;
