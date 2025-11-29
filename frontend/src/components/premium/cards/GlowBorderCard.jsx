import React from 'react';
import { motion } from 'framer-motion';

const GlowBorderCard = ({ children, onClick, className = '' }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`
        relative
        bg-white
        rounded-xl p-4
        border border-[rgba(0,200,214,0.2)]
        cursor-pointer
        transition-all duration-300
        ${className}
      `}
      style={{
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}
      whileHover={{
        borderColor: 'rgba(0, 200, 214, 1)',
        boxShadow: 'inset 0 0 0 1px #00C8D6, 0 0 15px rgba(0, 200, 214, 0.2), 0 4px 12px rgba(0, 200, 214, 0.1)',
        y: -2
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated glow border on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, rgba(0, 200, 214, 0.1), rgba(0, 200, 214, 0.05))',
          border: '1px solid rgba(0, 200, 214, 0.3)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlowBorderCard;