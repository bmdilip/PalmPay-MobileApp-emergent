import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SpotlightCard = ({ children, className = '' }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden
        bg-white
        rounded-xl p-6
        cursor-pointer
        transition-all duration-300
        ${className}
      `}
      style={{
        boxShadow: '0 10px 20px rgba(0, 200, 214, 0.1)',
        background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(0, 200, 214, 0.1) 0%, transparent 50%), white`
      }}
      onMouseMove={handleMouseMove}
      whileHover={{
        boxShadow: '0 15px 30px rgba(0, 200, 214, 0.15)',
        y: -4
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Spotlight glow effect */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 150px at ${position.x}% ${position.y}%, rgba(0, 200, 214, 0.15), transparent)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default SpotlightCard;