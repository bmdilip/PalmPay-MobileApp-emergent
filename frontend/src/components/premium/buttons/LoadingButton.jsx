import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check, X } from 'lucide-react';

const LoadingButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
  size = 'md',
  fullWidth = false,
  onSuccess,
  onError
}) => {
  const [state, setState] = useState('idle'); // idle, loading, success, error

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3.5 text-base'
  };

  const stateColors = {
    idle: 'from-[#00C8D6] to-[#008B95]',
    loading: 'from-[#00C8D6] to-[#008B95]',
    success: 'from-[#10B981] to-[#059669]',
    error: 'from-[#EF4444] to-[#DC2626]'
  };

  const handleClick = async () => {
    if (state !== 'idle') return;
    
    setState('loading');
    try {
      await onClick();
      setState('success');
      if (onSuccess) onSuccess();
      setTimeout(() => setState('idle'), 2000);
    } catch (err) {
      setState('error');
      if (onError) onError(err);
      setTimeout(() => setState('idle'), 2000);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled || state !== 'idle'}
      className={`
        relative overflow-hidden
        bg-gradient-to-r ${stateColors[state]}
        text-white font-semibold
        rounded-lg
        border-none
        cursor-pointer
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{
        boxShadow: '0 4px 6px rgba(0, 200, 214, 0.15)',
        letterSpacing: '0.5px'
      }}
      whileHover={state === 'idle' ? {
        y: -2,
        boxShadow: '0 10px 20px rgba(0, 200, 214, 0.25)'
      } : {}}
      whileTap={state === 'idle' ? { scale: 0.98 } : {}}
    >
      {/* Content with animation */}
      <span className="flex items-center justify-center gap-2">
        <AnimatePresence mode="wait">
          {state === 'loading' && (
            <motion.div
              key="loading"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <Loader2 className="w-4 h-4 animate-spin" />
            </motion.div>
          )}
          {state === 'success' && (
            <motion.div
              key="success"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <Check className="w-4 h-4" />
            </motion.div>
          )}
          {state === 'error' && (
            <motion.div
              key="error"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <X className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.span
          animate={{ opacity: state === 'loading' ? 0.7 : 1 }}
        >
          {state === 'success' ? 'Success!' : 
           state === 'error' ? 'Error!' :
           state === 'loading' ? 'Loading...' :
           children}
        </motion.span>
      </span>
    </motion.button>
  );
};

export default LoadingButton;