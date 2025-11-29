import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const GlowButton = ({
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
        boxShadow: '0 0 20px rgba(0, 200, 214, 0.3)',
        letterSpacing: '0.5px'
      }}
      whileHover={{
        y: -2,
        boxShadow: '0 0 30px rgba(0, 200, 214, 0.5), 0 10px 20px rgba(0, 0, 0, 0.1)'
      }}
      whileTap={{ scale: 0.98 }}
      animate={{
        boxShadow: [
          '0 0 20px rgba(0, 200, 214, 0.3)',
          '0 0 30px rgba(0, 200, 214, 0.4)',
          '0 0 20px rgba(0, 200, 214, 0.3)'
        ]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {/* Pulsing glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"
        animate={{
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
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

export default GlowButton;