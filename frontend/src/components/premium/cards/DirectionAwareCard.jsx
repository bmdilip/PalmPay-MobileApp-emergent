import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DirectionAwareCard = ({ children, onClick, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden
        bg-white
        rounded-xl p-4
        cursor-pointer
        border border-transparent
        ${className}
      `}
      style={{
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}
      whileHover={{
        borderColor: 'rgba(0, 200, 214, 0.3)',
        boxShadow: '0 4px 12px rgba(0, 200, 214, 0.1)',
        y: -2
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Direction-aware hover overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'rgba(0, 200, 214, 0.04)'
        }}
        animate={{
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Reveal effect from hover direction */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[rgba(0,200,214,0.1)] to-transparent pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default DirectionAwareCard;