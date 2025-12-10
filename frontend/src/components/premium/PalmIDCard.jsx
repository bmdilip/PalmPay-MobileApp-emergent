import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Shield, CheckCircle2, Copy, ExternalLink } from 'lucide-react';
import { mockUser } from '../../mockDataPalmPay';
import PalmNFCIcon from '../icons/PalmNFCIcon';

const PalmIDCard = ({ className = '' }) => {
  const [copied, setCopied] = React.useState(false);

  // Generate a realistic Palm ID format
  const palmId = `PLM-${mockUser.id.toUpperCase().slice(0, 8)}-${Date.now().toString().slice(-4)}`;
  const registeredDate = new Date(2024, 10, 15).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  const handleCopyPalmId = () => {
    navigator.clipboard.writeText(palmId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-xl">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#586BFF] via-[#6B7AFF] to-[#8B8FFF] opacity-10" />
        
        {/* Decorative Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <PalmNFCIcon className="w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(43%) sepia(71%) saturate(1805%) hue-rotate(215deg) brightness(99%) contrast(103%)' }} />
                <h3 className="text-base font-bold text-gray-800">Your Palm ID</h3>
              </div>
              <p className="text-xs text-gray-500">Verified biometric identity</p>
            </div>
            <motion.div
              className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle2 className="w-3 h-3 text-green-600" />
              <span className="text-xs font-semibold text-green-700">Active</span>
            </motion.div>
          </div>

          {/* Palm ID Display */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 mb-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Palm ID Number</p>
                <p className="text-sm font-mono font-bold text-gray-800 tracking-wide">{palmId}</p>
              </div>
              <motion.button
                onClick={handleCopyPalmId}
                className="ml-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-3 h-3 text-[#586BFF]" />
                <p className="text-xs text-gray-500">Status</p>
              </div>
              <p className="text-sm font-semibold text-gray-800">Verified</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <Hand className="w-3 h-3 text-[#586BFF]" />
                <p className="text-xs text-gray-500">Registered</p>
              </div>
              <p className="text-sm font-semibold text-gray-800">{registeredDate}</p>
            </div>
          </div>

          {/* Palm Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-3">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Hand className="w-3 h-3 text-[#586BFF]" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-800 mb-1">Right Palm Registered</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your palm biometric is encrypted and securely stored. Use it for contactless payments at PalmPe devices.
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#586BFF] to-[#6B7AFF] text-white rounded-lg font-medium text-sm hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/palm-settings'}
          >
            <span>Manage Palm ID</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );
};

export default PalmIDCard;