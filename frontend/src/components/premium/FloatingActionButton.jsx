import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const FloatingActionButton = ({ onClick, icon, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        fixed bottom-24 right-6
        w-14 h-14
        rounded-full
        bg-gradient-to-r from-[#00C8D6] to-[#008B95]
        text-white
        border-none
        cursor-pointer
        flex items-center justify-center
        z-40
        ${className}
      `}
      style={{
        boxShadow: '0 10px 25px rgba(0, 200, 214, 0.3)'
      }}
      animate={{
        y: [0, -10, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      whileHover={{
        scale: 1.1,
        y: -10,
        boxShadow: '0 15px 35px rgba(0, 200, 214, 0.4)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      {icon || <HelpCircle className="w-6 h-6" />}
    </motion.button>
  );
};

export default FloatingActionButton;