import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ toast, onClose }) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  const colors = {
    success: 'from-green-500 to-green-600',
    error: 'from-red-500 to-red-600',
    warning: 'from-amber-500 to-amber-600',
    info: 'from-blue-500 to-blue-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`bg-gradient-to-r ${colors[toast.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}
    >
      <div className="flex-shrink-0">
        {icons[toast.type]}
      </div>
      <div className="flex-1">
        {toast.title && <p className="font-semibold text-sm">{toast.title}</p>}
        <p className="text-sm opacity-90">{toast.message}</p>
      </div>
      {toast.dismissible !== false && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;