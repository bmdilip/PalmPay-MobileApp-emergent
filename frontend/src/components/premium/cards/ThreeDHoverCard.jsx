import React from 'react';
import { motion } from 'framer-motion';

const ThreeDHoverCard = ({ children, onClick, className = '', disableTilt = false }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`
        bg-white
        rounded-xl p-4
        cursor-pointer
        ${className}
      `}
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.04)',
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      whileHover={{
        y: -8,
        rotateX: disableTilt ? 0 : 2,
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        duration: 0.3,
        type: 'spring',
        stiffness: 300
      }}
    >
      {children}
    </motion.div>
  );
};

export default ThreeDHoverCard;