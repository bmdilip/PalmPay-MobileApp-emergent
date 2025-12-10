import React from 'react';
import { motion } from 'framer-motion';
import {
  Inbox,
  PackageOpen,
  SearchX,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  CreditCard,
  Receipt,
  Wallet,
  Users,
  Bell,
  History,
  TrendingUp
} from 'lucide-react';

const EmptyState = ({ 
  type = 'default',
  title,
  description,
  action,
  actionText = 'Get Started',
  icon: CustomIcon
}) => {
  const iconMap = {
    default: Inbox,
    search: SearchX,
    error: AlertCircle,
    pending: Clock,
    success: CheckCircle2,
    failed: XCircle,
    transaction: Receipt,
    wallet: Wallet,
    history: History,
    users: Users,
    notifications: Bell,
    documents: FileText,
    card: CreditCard,
    empty: PackageOpen,
    growth: TrendingUp
  };

  const Icon = CustomIcon || iconMap[type] || Inbox;

  const colorMap = {
    default: 'text-gray-400',
    search: 'text-blue-400',
    error: 'text-red-400',
    pending: 'text-yellow-400',
    success: 'text-green-400',
    failed: 'text-red-400',
    transaction: 'text-purple-400',
    wallet: 'text-indigo-400',
    history: 'text-slate-400',
    users: 'text-cyan-400',
    notifications: 'text-amber-400',
    documents: 'text-blue-400',
    card: 'text-pink-400',
    empty: 'text-gray-400',
    growth: 'text-green-400'
  };

  const bgColorMap = {
    default: 'bg-gray-100',
    search: 'bg-blue-100',
    error: 'bg-red-100',
    pending: 'bg-yellow-100',
    success: 'bg-green-100',
    failed: 'bg-red-100',
    transaction: 'bg-purple-100',
    wallet: 'bg-indigo-100',
    history: 'bg-slate-100',
    users: 'bg-cyan-100',
    notifications: 'bg-amber-100',
    documents: 'bg-blue-100',
    card: 'bg-pink-100',
    empty: 'bg-gray-100',
    growth: 'bg-green-100'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1 
        }}
        className={`w-20 h-20 rounded-full ${bgColorMap[type]} flex items-center justify-center mb-6 relative`}
      >
        {/* Pulse effect */}
        <motion.div
          className={`absolute inset-0 rounded-full ${bgColorMap[type]} opacity-50`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <Icon className={`w-10 h-10 ${colorMap[type]} relative z-10`} />
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold text-gray-800 mb-2"
      >
        {title || 'No data yet'}
      </motion.h3>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-500 mb-6 max-w-xs"
        >
          {description}
        </motion.p>
      )}

      {/* Action Button */}
      {action && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={action}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
        >
          {actionText}
        </motion.button>
      )}

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-indigo-200 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
};

export default EmptyState;
