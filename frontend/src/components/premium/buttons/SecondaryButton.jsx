import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const SecondaryButton = ({
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
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative
        bg-transparent
        border-2 border-[#00C8D6]
        text-[#00C8D6] font-semibold
        rounded-lg
        cursor-pointer
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      whileHover={{
        backgroundColor: 'rgba(0, 200, 214, 0.08)',
        boxShadow: '0 4px 8px rgba(0, 200, 214, 0.1)',
        y: -1
      }}
      whileTap={{ 
        backgroundColor: 'rgba(0, 200, 214, 0.15)',
        scale: 0.98 
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Content */}
      <span className="flex items-center justify-center gap-2">
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

export default SecondaryButton;