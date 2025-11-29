import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatentBadgesOnboarding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-advance after 5 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const badges = [
    {
      id: 1,
      icon: Lock,
      title: 'Patent Pending: Palm-Vein Authentication',
      description: 'Advanced biometric technology securing your payments'
    },
    {
      id: 2,
      icon: Shield,
      title: 'Patent Pending: Dual-Layer Security',
      description: 'Enterprise-grade multi-factor protection'
    }
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 py-10 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #001F3F 0%, #0F3A5F 50%, #1a4d6d 100%)'
      }}
    >
      {/* Animated background circles */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 200, 214, 0.1) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 200, 214, 0.08) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md space-y-10">
        {/* Title */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white">
            Protecting Your Innovation
          </h1>
          <p className="text-gray-400 text-sm">
            Enterprise-grade security & IP protection
          </p>
        </motion.div>

        {/* Patent Badges */}
        <div className="space-y-4">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <motion.div
                key={badge.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-[rgba(0,200,214,0.1)] to-[rgba(0,200,214,0.05)] border border-[rgba(0,200,214,0.3)] backdrop-blur-sm"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
              >
                <motion.div
                  className="flex-shrink-0 mt-1"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.5
                  }}
                >
                  <IconComponent className="w-6 h-6 text-[#00C8D6]" />
                </motion.div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#00C8D6] mb-1 leading-tight">
                    {badge.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {badge.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center pt-6 border-t border-[rgba(0,200,214,0.15)] space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xs text-gray-400 italic">
            Protecting your innovation and investment
          </p>
          <button
            onClick={() => navigate('/home')}
            className="w-full py-3 bg-gradient-to-r from-[#00C8D6] to-[#008B95] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
          </button>
        </motion.div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map((dot) => (
            <motion.div
              key={dot}
              className="w-2 h-2 rounded-full bg-gray-600"
              animate={{
                backgroundColor: dot === 3 ? '#00C8D6' : '#4B5563',
                scale: dot === 3 ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatentBadgesOnboarding;