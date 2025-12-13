import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Train, 
  GraduationCap, 
  Briefcase, 
  Users, 
  MoreHorizontal,
  ArrowRight,
  X
} from 'lucide-react';

const CircularUseCaseHub = () => {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState(null);

  // Primary use-cases (always visible)
  const primaryUseCases = [
    {
      id: 'metro',
      title: 'Metro & Transit',
      shortTitle: 'Metro',
      icon: Train,
      color: '#0EA5E9',
      gradient: 'from-blue-500 to-cyan-500',
      path: '/use-cases/metro',
      description: 'Use PalmPay for metro entry and exit'
    },
    {
      id: 'schools',
      title: 'Schools',
      shortTitle: 'Schools',
      icon: GraduationCap,
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-violet-500',
      path: '/use-cases/schools',
      description: 'Smart campus payments & attendance'
    },
    {
      id: 'offices',
      title: 'Offices',
      shortTitle: 'Offices',
      icon: Briefcase,
      color: '#10B981',
      gradient: 'from-green-500 to-emerald-500',
      path: '/use-cases/offices',
      description: 'Secure workplace authentication'
    },
    {
      id: 'palm-circle',
      title: 'Palm Circle',
      shortTitle: 'Family',
      icon: Users,
      color: '#EC4899',
      gradient: 'from-pink-500 to-rose-500',
      path: '/use-cases/palm-circle',
      description: 'Family wallet with spending limits'
    }
  ];

  const handleCardClick = (useCase) => {
    setSelectedCase(useCase);
  };

  const handleNavigate = () => {
    if (selectedCase) {
      navigate(selectedCase.path);
    }
  };

  const radius = 130; // Distance from center
  const centerSize = 100; // Center logo size
  const cardSize = 80; // Use-case card size

  return (
    <div className="relative w-full py-8 px-5">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          PalmPay Use-Case Hub
        </h2>
        <p className="text-sm text-gray-500">
          Palm-based authentication across industries
        </p>
      </motion.div>

      {/* Static 3D Circular Hub */}
      <div className="relative w-full h-[380px] flex items-center justify-center mb-6">
        {/* Center - PalmPay Logo with Frosted Glass Effect */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="absolute z-20"
          style={{ width: centerSize, height: centerSize }}
        >
          {/* Frosted Glass Container */}
          <div className="relative w-full h-full rounded-full bg-white/90 backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-[0_8px_32px_rgba(88,107,255,0.3)]"
            style={{
              boxShadow: '0 8px 32px rgba(88, 107, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            }}
          >
            {/* Subtle Breathing Glow */}
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#586BFF]/20 to-[#9B62FF]/20 blur-2xl"
            />

            {/* PalmPay Logo */}
            <div className="relative z-10 flex flex-col items-center">
              <svg
                width="50"
                height="50"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#586BFF" />
                    <stop offset="100%" stopColor="#9B62FF" />
                  </linearGradient>
                </defs>
                {/* Stylized P letter with palm concept */}
                <path
                  d="M30 20 L30 80 M30 20 C45 20, 55 30, 55 45 C55 60, 45 70, 30 70"
                  stroke="url(#logoGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Palm lines */}
                <path
                  d="M65 35 L75 25 M68 45 L80 45 M65 55 L75 65"
                  stroke="url(#logoGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-[10px] font-bold text-gray-700 mt-1 tracking-wide">PALMPAY</p>
            </div>
          </div>
        </motion.div>

        {/* Static 3D Positioned Use-Case Cards */}
        {primaryUseCases.map((useCase, index) => {
          const angle = (index * 90) - 45; // Position at 45°, 135°, 225°, 315°
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);
          
          const isSelected = selectedCase?.id === useCase.id;

          return (
            <motion.div
              key={useCase.id}
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                x: x,
                y: y
              }}
              whileHover={{ 
                scale: 1.05,
                y: y - 4
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: index * 0.1 
              }}
              className="absolute cursor-pointer"
              style={{ 
                width: cardSize, 
                height: cardSize,
                transform: `translate(-50%, -50%)`
              }}
              onClick={() => handleCardClick(useCase)}
            >
              {/* Card with Depth */}
              <div 
                className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center transition-all duration-300 ${
                  isSelected 
                    ? 'shadow-[0_12px_40px_rgba(0,0,0,0.25)]' 
                    : 'shadow-[0_8px_24px_rgba(0,0,0,0.15)]'
                }`}
                style={{
                  transform: isSelected ? 'translateZ(20px)' : 'translateZ(10px)'
                }}
              >
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
                
                {/* Icon */}
                <useCase.icon className="w-10 h-10 text-white relative z-10" />

                {/* Selected Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#586BFF] to-[#9B62FF]" />
                  </motion.div>
                )}
              </div>

              {/* Label - Below Card */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 text-center">
                <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                  {useCase.shortTitle}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* More Option */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.5 }}
          className="absolute cursor-pointer"
          style={{
            width: cardSize,
            height: cardSize,
            bottom: -radius,
            left: '50%',
            transform: 'translate(-50%, 50%)'
          }}
        >
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-all">
            <MoreHorizontal className="w-10 h-10 text-gray-600" />
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 text-center">
            <p className="text-sm font-semibold text-gray-600 whitespace-nowrap">More</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Preview Panel */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative"
          >
            {/* Frosted Glass Panel */}
            <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
              {/* Close Button */}
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              {/* Content */}
              <div className="pr-10">
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedCase.gradient} flex items-center justify-center shadow-md`}
                  >
                    <selectedCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {selectedCase.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {selectedCase.description}
                </p>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNavigate}
                  className={`w-full bg-gradient-to-r ${selectedCase.gradient} text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all`}
                >
                  Check Availability
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CircularUseCaseHub;
