import React from 'react';
import { motion } from 'framer-motion';

const IconButton = ({
  icon,
  onClick,
  disabled = false,
  className = '',
  size = 'md',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-base',
    md: 'w-10 h-10 text-xl',
    lg: 'w-12 h-12 text-2xl'
  };

  const variantClasses = {
    default: 'text-gray-600',
    primary: 'text-[#00C8D6]',
    white: 'text-white'
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center
        bg-transparent
        rounded-full
        border-none
        cursor-pointer
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={{
        backgroundColor: 'rgba(0, 200, 214, 0.1)',
        color: '#00C8D6',
        scale: 1.1,
        boxShadow: '0 0 8px rgba(0, 200, 214, 0.2)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {icon}
    </motion.button>
  );
};

export default IconButton;