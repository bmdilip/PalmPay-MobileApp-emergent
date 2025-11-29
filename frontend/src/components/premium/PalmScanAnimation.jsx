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

  // Floating particles configuration
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2
  }));

  if (prefersReducedMotion) {
    return (
      <div className={`relative w-full max-w-sm mx-auto ${className}`}>
        <svg viewBox="0 0 300 400" className="w-full h-full">
          <PalmOutlineSVG />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative w-full max-w-sm mx-auto ${className}`}>
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-[#586BFF] rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Main Palm Scan Container */}
      <div className="relative">
        {/* Outer Glow Ring */}
        <motion.div
          className="absolute inset-0 -m-16 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(88, 107, 255, 0.15) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Rotating HUD Rings */}
        <motion.div
          className="absolute inset-0 -m-12"
          animate={{ rotate: 360 }}
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
              r="90"
              fill="none"
              stroke="url(#hudGradient)"
              strokeWidth="1"
              strokeDasharray="5 10"
              opacity="0.6"
            />
            <defs>
              <linearGradient id="hudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#586BFF" />
                <stop offset="100%" stopColor="#9B62FF" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Inner Rotating Ring */}
        <motion.div
          className="absolute inset-0 -m-8"
          animate={{ rotate: -360 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#586BFF"
              strokeWidth="0.5"
              strokeDasharray="3 8"
              opacity="0.4"
            />
          </svg>
        </motion.div>

        {/* Palm Outline with Glow */}
        <motion.div
          className="relative z-10"
          animate={{
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            filter: 'drop-shadow(0 0 30px rgba(88, 107, 255, 0.8))'
          }}
        >
          <svg viewBox="0 0 300 400" className="w-full h-full">
            <defs>
              {/* Palm Gradient */}
              <linearGradient id="palmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#586BFF" />
                <stop offset="100%" stopColor="#9B62FF" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <PalmOutlineSVG 
              gradient="palmGradient" 
              glow="glow"
              animate={!prefersReducedMotion}
            />
          </svg>
        </motion.div>

        {/* IR Scan Sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
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
            className="h-12 w-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(88, 107, 255, 0.3) 50%, transparent 100%)',
              filter: 'blur(8px)'
            }}
          />
        </motion.div>
      </div>

      {/* Scan Progress Indicator */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-white text-sm font-medium mb-3">
                Scanning... {scanProgress}%
              </p>
              
              {/* Progress Bar */}
              <div className="relative w-64 h-2 mx-auto bg-gray-800 rounded-full overflow-hidden">
                {/* Glow Background */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, rgba(88, 107, 255, 0.3), rgba(155, 98, 255, 0.3))',
                    filter: 'blur(4px)'
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                
                {/* Progress Fill */}
                <motion.div
                  className="h-full rounded-full relative z-10"
                  style={{
                    background: 'linear-gradient(90deg, #586BFF, #9B62FF)',
                    boxShadow: '0 0 10px rgba(88, 107, 255, 0.8)'
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="flex flex-col items-center gap-3"
            >
              {/* Complete Pulse Effect */}
              <motion.div
                className="relative"
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.5,
                  repeat: 2
                }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#586BFF] to-[#9B62FF] flex items-center justify-center shadow-lg">
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
                
                {/* Pulse Rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#586BFF]"
                  animate={{
                    scale: [1, 2],
                    opacity: [1, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeOut'
                  }}
                />
              </motion.div>
              
              <p className="text-white text-base font-bold">Scan Complete!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Anatomically Correct Palm Outline SVG Component
const PalmOutlineSVG = ({ gradient = '#586BFF', glow = '', animate = true }) => {
  return (
    <g filter={glow ? `url(#${glow})` : ''}>
      {/* Palm Base */}
      <motion.path
        d="M 150 320 Q 130 300 120 270 L 120 180 Q 120 150 140 140 L 160 140 L 160 270 Q 165 300 150 320 Z"
        fill="none"
        stroke={gradient ? `url(#${gradient})` : gradient}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />

      {/* Thumb */}
      <motion.path
        d="M 120 220 Q 100 210 85 190 Q 70 170 70 150 Q 70 130 80 120 Q 90 110 100 115 Q 110 120 110 135 L 115 180 L 120 210"
        fill="none"
        stroke={gradient ? `url(#${gradient})` : gradient}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.1, ease: 'easeInOut' }}
      />

      {/* Index Finger */}
      <motion.path
        d="M 135 140 L 135 80 Q 135 60 140 55 Q 145 50 150 55 Q 155 60 155 80 L 155 140"
        fill="none"
        stroke={gradient ? `url(#${gradient})` : gradient}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: 'easeInOut' }}
      />

      {/* Middle Finger */}
      <motion.path
        d="M 155 140 L 155 50 Q 155 35 160 30 Q 165 25 170 30 Q 175 35 175 50 L 175 140"
        fill="none"
        stroke={gradient ? `url(#${gradient})` : gradient}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
      />

      {/* Ring Finger */}
      <motion.path
        d="M 175 140 L 175 70 Q 175 55 180 50 Q 185 45 190 50 Q 195 55 195 70 L 195 140"
        fill="none"
        stroke={gradient ? `url(#${gradient})` : gradient}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.4, ease: 'easeInOut' }}
      />

      {/* Pinky Finger */}
      <motion.path
        d="M 195 140 L 195 100 Q 195 85 200 80 Q 205 75 210 80 Q 215 85 215 100 L 215 140"
        fill="none"
        stroke={gradient ? `url(#${gradient})` : gradient}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
      />

      {/* Vein Lines - Subtle */}
      <motion.path
        d="M 145 200 Q 150 180 155 160"
        fill="none"
        stroke={gradient ? `url(#${gradient})` : gradient}
        strokeWidth="1"
        opacity="0.4"
        strokeDasharray="2 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.4 } : {}}
        transition={{ duration: 1.5, delay: 0.6, ease: 'easeInOut' }}
      />

      <motion.path
        d="M 165 200 Q 170 180 175 160"
        fill="none"
        stroke={gradient ? `url(#${gradient})` : gradient}
        strokeWidth="1"
        opacity="0.4"
        strokeDasharray="2 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 0.4 } : {}}
        transition={{ duration: 1.5, delay: 0.7, ease: 'easeInOut' }}
      />
    </g>
  );
};

export default PalmScanAnimation;
