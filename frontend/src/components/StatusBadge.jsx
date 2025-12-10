import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertCircle,
  Loader2,
  CheckCheck,
  CircleDashed,
  Ban,
  Hourglass,
  CircleSlash
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatusBadge = ({ 
  status = 'pending', 
  text,
  size = 'sm',
  showIcon = true,
  animated = true 
}) => {
  const statusConfig = {
    success: {
      icon: CheckCircle2,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
      iconColor: 'text-green-500',
      pulseColor: 'bg-green-500'
    },
    completed: {
      icon: CheckCheck,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-200',
      iconColor: 'text-emerald-500',
      pulseColor: 'bg-emerald-500'
    },
    pending: {
      icon: Clock,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-200',
      iconColor: 'text-amber-500',
      pulseColor: 'bg-amber-500'
    },
    processing: {
      icon: Loader2,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-500',
      pulseColor: 'bg-blue-500',
      spin: true
    },
    waiting: {
      icon: Hourglass,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-500',
      pulseColor: 'bg-purple-500'
    },
    failed: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      iconColor: 'text-red-500',
      pulseColor: 'bg-red-500'
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      iconColor: 'text-red-500',
      pulseColor: 'bg-red-500'
    },
    cancelled: {
      icon: Ban,
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200',
      iconColor: 'text-gray-500',
      pulseColor: 'bg-gray-500'
    },
    inactive: {
      icon: CircleSlash,
      bgColor: 'bg-slate-50',
      textColor: 'text-slate-700',
      borderColor: 'border-slate-200',
      iconColor: 'text-slate-500',
      pulseColor: 'bg-slate-500'
    },
    draft: {
      icon: CircleDashed,
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200',
      iconColor: 'text-gray-500',
      pulseColor: 'bg-gray-500'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const BadgeContent = (
    <>
      {showIcon && (
        <motion.div
          animate={config.spin ? { rotate: 360 } : {}}
          transition={config.spin ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
        >
          <Icon className={`${iconSizes[size]} ${config.iconColor}`} />
        </motion.div>
      )}
      <span className="font-medium capitalize">
        {text || status}
      </span>
      {animated && (
        <motion.div
          className={`absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${config.pulseColor}`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`
        inline-flex items-center gap-1.5 
        ${sizeClasses[size]}
        ${config.bgColor}
        ${config.textColor}
        ${config.borderColor}
        border rounded-full
        font-medium
        relative
        transition-all duration-200
      `}
    >
      {BadgeContent}
    </motion.div>
  );
};

export default StatusBadge;
