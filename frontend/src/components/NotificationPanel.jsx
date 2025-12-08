import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, ArrowUpRight, ArrowDownLeft, Zap, Shield, Bell, Clock } from 'lucide-react';
import { Card } from './ui/card';

const NotificationPanel = ({ isOpen, onClose, notifications }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'login':
        return <Shield className="w-5 h-5 text-green-600" />;
      case 'sent':
        return <ArrowUpRight className="w-5 h-5 text-orange-600" />;
      case 'received':
        return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
      case 'bill':
        return <Zap className="w-5 h-5 text-blue-600" />;
      case 'recharge':
        return <Zap className="w-5 h-5 text-purple-600" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'login':
        return 'bg-green-50';
      case 'sent':
        return 'bg-orange-50';
      case 'received':
        return 'bg-green-50';
      case 'bill':
        return 'bg-blue-50';
      case 'recharge':
        return 'bg-purple-50';
      case 'success':
        return 'bg-green-50';
      case 'alert':
        return 'bg-orange-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Notification Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[9999] overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#586BFF] to-[#9B62FF] p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Notifications</h2>
                  <p className="text-xs text-white/80">{notifications.length} new updates</p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto h-[calc(100%-88px)] p-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Bell className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium mb-1">No notifications yet</p>
                  <p className="text-sm text-gray-400">We'll notify you when something arrives</p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4" 
                      style={{ borderLeftColor: notification.color || '#586BFF' }}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-full ${getBackgroundColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                          {getIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">
                            {notification.title}
                          </h3>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{notification.time}</span>
                          </div>
                        </div>

                        {/* Amount (if applicable) */}
                        {notification.amount && (
                          <div className="text-right flex-shrink-0">
                            <p className={`font-bold text-sm ${
                              notification.type === 'received' ? 'text-green-600' : 'text-orange-600'
                            }`}>
                              {notification.type === 'received' ? '+' : '-'}₹{notification.amount}
                            </p>
                          </div>
                        )}

                        {/* Unread indicator */}
                        {notification.unread && (
                          <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;
