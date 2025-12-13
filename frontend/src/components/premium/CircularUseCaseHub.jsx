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
    <div className="relative w-full py-8">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          PalmPay Use-Case Hub
        </h2>
        <p className="text-sm text-gray-500">
          Experience palm-based authentication across industries
        </p>
      </motion.div>

      {/* Circular Hub Container */}
      <div className="relative w-full h-[400px] flex items-center justify-center">
        {/* Center Palm Device */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            boxShadow: selectedCase ? '0 0 60px rgba(88, 107, 255, 0.6)' : '0 0 40px rgba(88, 107, 255, 0.4)'
          }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="absolute z-10"
          style={{
            width: centerSize,
            height: centerSize,
          }}
        >
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#586BFF] via-[#7B8EFF] to-[#9B62FF] flex items-center justify-center shadow-2xl">
            {/* Animated Glow Ring */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-40 blur-xl"
            />

            {/* Palm Hand Icon */}
            <motion.div
              animate={{
                scale: isRotating ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="relative z-10"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
            </motion.div>

            {/* Center Text */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <p className="text-xs font-bold text-gray-700">PalmPay Device</p>
            </div>
          </div>
        </motion.div>

        {/* Rotating Use Case Icons */}
        <motion.div
          animate={isRotating ? { rotate: 360 } : {}}
          transition={isRotating ? { 
            duration: 30, 
            repeat: Infinity, 
            ease: 'linear' 
          } : {}}
          className="absolute"
          style={{ width: radius * 2, height: radius * 2 }}
        >
          {useCases.map((useCase, index) => {
            const angle = (index * 360) / useCases.length;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);
            
            const isSelected = selectedCase === useCase.id;
            const isHovered = hoveredCase === useCase.id;
            const isDimmed = (selectedCase || hoveredCase) && !isSelected && !isHovered;

            return (
              <motion.div
                key={useCase.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isSelected || isHovered ? 1.3 : 1,
                  opacity: isDimmed ? 0.4 : 1,
                  x: radius + x - 40,
                  y: radius + y - 40,
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 20,
                  delay: index * 0.1 
                }}
                className="absolute cursor-pointer"
                style={{ 
                  width: 80, 
                  height: 80,
                }}
                onClick={() => handleUseCaseClick(useCase)}
                onMouseEnter={() => {
                  setIsRotating(false);
                  setHoveredCase(useCase.id);
                }}
                onMouseLeave={() => {
                  if (!selectedCase) setIsRotating(true);
                  setHoveredCase(null);
                }}
              >
                {/* Rotating Counter-Animation for Icons */}
                <motion.div
                  animate={isRotating ? { rotate: -360 } : {}}
                  transition={isRotating ? { 
                    duration: 30, 
                    repeat: Infinity, 
                    ease: 'linear' 
                  } : {}}
                  className="w-full h-full"
                >
                  <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${useCase.gradient} flex items-center justify-center shadow-lg hover:shadow-2xl transition-all`}>
                    {/* Glow Effect on Hover */}
                    {(isHovered || isSelected) && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ 
                          duration: 1, 
                          repeat: Infinity,
                          ease: 'easeOut'
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{ 
                          backgroundColor: useCase.color,
                          filter: 'blur(20px)'
                        }}
                      />
                    )}

                    <useCase.icon className="w-8 h-8 text-white relative z-10" />

                    {/* Status Badge */}
                    {useCase.status === 'live' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Sparkles className="w-3 h-3 text-white" />
                      </motion.div>
                    )}

                    {useCase.status === 'coming-soon' && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 px-2 py-0.5 bg-gray-800 text-white text-[8px] font-bold rounded-full whitespace-nowrap">
                        Soon
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Label - Counter-rotates to stay upright */}
                <motion.div
                  animate={isRotating ? { rotate: -360 } : {}}
                  transition={isRotating ? { 
                    duration: 30, 
                    repeat: Infinity, 
                    ease: 'linear' 
                  } : {}}
                  className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center"
                  style={{ width: '120px' }}
                >
                  <p className="text-xs font-bold text-gray-800 whitespace-nowrap">
                    {useCase.title}
                  </p>
                  {(isHovered || isSelected) && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] text-gray-500 mt-1"
                    >
                      {useCase.description}
                    </motion.p>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Coming Soon Notification */}
      <AnimatePresence>
        {selectedCase && useCases.find(uc => uc.id === selectedCase)?.status === 'coming-soon' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <p className="text-sm font-medium">Coming Soon! Stay Tuned 🚀</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CircularUseCaseHub;
