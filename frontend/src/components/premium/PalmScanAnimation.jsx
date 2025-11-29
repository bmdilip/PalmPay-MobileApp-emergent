import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const PalmScanAnimation = ({ className = '' }) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (hasScanned || prefersReducedMotion) return;

    // Start scanning after 500ms delay
    const startDelay = setTimeout(() => {
      const duration = 2800; // 2.8 seconds scan
      const steps = 100;
      const interval = duration / steps;

      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 1;
        setScanProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          setIsComplete(true);
          setHasScanned(true);
          
          // Reset complete state after 2 seconds
          setTimeout(() => {
            setIsComplete(false);
          }, 2000);
        }
      }, interval);

      return () => clearInterval(progressInterval);
    }, 500);

    return () => clearTimeout(startDelay);
  }, [hasScanned, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className={`relative w-full max-w-[280px] mx-auto ${className}`}>
        <div className="aspect-square rounded-full overflow-hidden">
          <img 
            src="https://customer-assets.emergentagent.com/job_premium-finance-ui/artifacts/s4cwatpu_Gemini_Generated_Image_rxgnaarxgnaarxgn%20%281%29.png"
            alt="Palm Scan"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full max-w-[280px] mx-auto ${className}`}>
      {/* Main Container with proper sizing */}
      <div className="relative aspect-square">
        {/* Outer rotating HUD ring */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle
              cx="100"
              cy="100"
              r="95"
              fill="none"
              stroke="url(#hudGradient1)"
              strokeWidth="1"
              strokeDasharray="4 8"
              opacity="0.4"
            />
            <defs>
              <linearGradient id="hudGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#64E8FF" />
                <stop offset="100%" stopColor="#586BFF" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Middle rotating HUD ring */}
        <motion.div
          className="absolute inset-[8%]"
          animate={{ rotate: -360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle
              cx="100"
              cy="100"
              r="95"
              fill="none"
              stroke="#586BFF"
              strokeWidth="0.8"
              strokeDasharray="2 6"
              opacity="0.5"
            />
          </svg>
        </motion.div>

        {/* Inner Glow Ring */}
        <motion.div
          className="absolute inset-[15%]"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(88, 107, 255, 0.3) 0%, transparent 70%)',
              filter: 'blur(12px)'
            }}
          />
        </motion.div>

        {/* Palm Image Container - Fixed size to prevent overflow */}
        <div className="absolute inset-[18%] rounded-full overflow-hidden shadow-2xl">
          <motion.img 
            src="https://customer-assets.emergentagent.com/job_premium-finance-ui/artifacts/s4cwatpu_Gemini_Generated_Image_rxgnaarxgnaarxgn%20%281%29.png"
            alt="Palm Scan"
            className="w-full h-full object-cover"
            animate={{
              scale: [1, 1.03, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(100, 232, 255, 0.6))'
            }}
          />
          
          {/* IR Scan Beam */}
          <motion.div
            className="absolute left-0 right-0 pointer-events-none"
            animate={{
              top: ['0%', '100%']
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <div 
              className="h-8 w-full"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, rgba(100, 232, 255, 0.5) 50%, transparent 100%)',
                filter: 'blur(4px)'
              }}
            />
          </motion.div>
        </div>

        {/* Scanning Percentage Display - Top Right Corner */}
        {!isComplete && (
          <motion.div
            className="absolute -top-2 -right-2 bg-gradient-to-br from-[#586BFF] to-[#64E8FF] text-white px-3 py-1.5 rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-1">
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{
                  opacity: [1, 0.3, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
              />
              <span className="text-xs font-bold">{scanProgress}%</span>
            </div>
          </motion.div>
        )}

        {/* Complete Badge */}
        {isComplete && (
          <motion.div
            className="absolute -top-2 -right-2 bg-gradient-to-br from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full shadow-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          >
            <div className="flex items-center gap-1">
              <Check className="w-3 h-3" strokeWidth={3} />
              <span className="text-xs font-bold">Done</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scan Status Text */}
      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.p
              key="scanning"
              className="text-white text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Scanning palm...
              </motion.span>
            </motion.p>
          ) : (
            <motion.p
              key="complete"
              className="text-green-400 text-sm font-bold"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              ✓ Scan Complete!
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PalmScanAnimation;