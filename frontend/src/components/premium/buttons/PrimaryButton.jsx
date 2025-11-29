import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const PrimaryButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  icon = null,
  className = '',
  size = 'md',
  fullWidth = false
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3.5 text-base'
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden
        bg-gradient-to-r from-[#00C8D6] to-[#008B95]
        text-white font-semibold
        rounded-lg
        border-none
        cursor-pointer
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{
        boxShadow: '0 4px 6px rgba(0, 200, 214, 0.15)',
        letterSpacing: '0.5px'
      }}
      whileHover={{
        y: -2,
        boxShadow: '0 10px 20px rgba(0, 200, 214, 0.25)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          icon && <span>{icon}</span>
        )}
        {children}
      </span>
    </motion.button>
  );
};

export default PrimaryButton;