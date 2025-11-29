import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const PalmVeinScanner = ({ status = 'scanning', onScanComplete }) => {
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (status === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            onScanComplete?.('success');
            return 100;
          }
          return prev + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [status, onScanComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] relative">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 200, 214, 0.15) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Palm vein image container */}
      <div className="relative z-10">
        {/* Scanning rings */}
        <motion.div
          className="absolute inset-0 -m-8"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div className="w-full h-full border-2 border-[#00C8D6]/30 rounded-full" />
        </motion.div>

        {/* Rotating dashed ring */}
        <motion.div
          className="absolute inset-0 -m-6"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              border: '1px dashed rgba(0, 200, 214, 0.5)'
            }}
          />
        </motion.div>

        {/* Palm vein image */}
        <motion.div
          className="relative w-48 h-48 flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            filter: 'drop-shadow(0 0 30px rgba(0, 200, 214, 0.4))'
          }}
        >
          {/* Palm icon (using SVG path for palm outline) */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            style={{ fill: 'none', stroke: '#00C8D6', strokeWidth: 2 }}
          >
            <motion.path
              d="M100,40 L100,100 M80,50 L80,90 M60,60 L60,80 M120,50 L120,90 M140,60 L140,80 M100,100 Q85,130 70,150 Q65,160 75,165 Q85,170 95,165 L100,160 L105,165 Q115,170 125,165 Q135,160 130,150 Q115,130 100,100"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </svg>

          {/* Scanning line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: 'linear-gradient(to right, transparent 0%, #00C8D6 50%, transparent 100%)',
              boxShadow: '0 0 20px rgba(0, 200, 214, 0.8)'
            }}
            animate={{
              top: ['0%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      </div>

      {/* Status Display */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {status === 'scanning' && (
          <div className="space-y-3">
            <p className="text-white text-sm font-medium">Scanning palm vein...</p>
            <div className="w-48 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00C8D6] to-[#008B95] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-gray-400 text-xs">{scanProgress}% complete</p>
          </div>
        )}

        {status === 'success' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="space-y-2"
          >
            <div className="w-12 h-12 mx-auto bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <p className="text-green-400 font-semibold">Authentication Successful!</p>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="space-y-3"
          >
            <div className="w-12 h-12 mx-auto bg-red-500 rounded-full flex items-center justify-center">
              <X className="w-6 h-6 text-white" />
            </div>
            <p className="text-red-400 font-semibold">Scan Failed</p>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors">
              Try Again
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PalmVeinScanner;