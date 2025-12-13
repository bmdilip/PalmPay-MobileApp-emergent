import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Train, 
  GraduationCap, 
  Briefcase, 
  Users, 
  Hospital,
  ShoppingBag,
  Building2,
  ArrowRight,
  X,
  MapPin
} from 'lucide-react';
import PalmNFCIcon from '../icons/PalmNFCIcon';

const CircularUseCaseHub = () => {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState(null);

  // All use-cases - Enterprise-grade categorization
  const useCases = [
    {
      id: 'metro',
      title: 'Metro & Transit',
      shortTitle: 'Metro',
      icon: Train,
      color: '#0EA5E9',
      gradient: 'from-blue-500 to-cyan-500',
      path: '/use-cases/metro',
      description: 'Tap and travel across metros, buses, and local trains',
      status: 'live'
    },
    {
      id: 'schools',
      title: 'Schools & Education',
      shortTitle: 'Education',
      icon: GraduationCap,
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-violet-500',
      path: '/use-cases/schools',
      description: 'Smart campus payments, attendance, and cafeteria access',
      status: 'live'
    },
    {
      id: 'offices',
      title: 'Corporate & Offices',
      shortTitle: 'Corporate',
      icon: Briefcase,
      color: '#10B981',
      gradient: 'from-green-500 to-emerald-500',
      path: '/use-cases/offices',
      description: 'Secure workplace authentication and access control',
      status: 'live'
    },
    {
      id: 'hospitals',
      title: 'Healthcare',
      shortTitle: 'Healthcare',
      icon: Hospital,
      color: '#EF4444',
      gradient: 'from-red-500 to-rose-500',
      path: '/use-cases/hospitals',
      description: 'Fast, secure payments for healthcare services',
      status: 'live'
    },
    {
      id: 'retail',
      title: 'Retail & Shopping',
      shortTitle: 'Retail',
      icon: ShoppingBag,
      color: '#F59E0B',
      gradient: 'from-orange-500 to-amber-500',
      path: '/use-cases/retail',
      description: 'Shop at stores and malls with palm authentication',
      status: 'live'
    },
    {
      id: 'palm-circle',
      title: 'Family Circle',
      shortTitle: 'Family',
      icon: Users,
      color: '#EC4899',
      gradient: 'from-pink-500 to-rose-500',
      path: '/use-cases/palm-circle',
      description: 'Shared family wallet with smart spending controls',
      status: 'live'
    },
    {
      id: 'smart-city',
      title: 'Smart City',
      shortTitle: 'Smart City',
      icon: Building2,
      color: '#6366F1',
      gradient: 'from-indigo-500 to-blue-500',
      path: '/use-cases/smart-city',
      description: 'Connected urban services and event access',
      status: 'live'
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

  // Dynamic positioning for 7 use-cases in a circle
  const getPosition = (index, total) => {
    const angle = (index * 360 / total) - 90; // Start from top
    const radius = 120;
    const x = radius * Math.cos((angle * Math.PI) / 180);
    const y = radius * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  };

  const cardSize = 65; // Smaller, more elegant

  return (
    <div className="relative w-full py-6 px-4">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          PalmPay Use-Case Hub
        </h2>
        <p className="text-xs text-gray-500">
          Palm authentication across every touchpoint
        </p>
      </motion.div>

      {/* Static 3D Circular Hub */}
      <div className="relative w-full h-[320px] flex items-center justify-center mb-6">
        
        {/* Subtle Background Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-64 h-64 rounded-full border-2 border-gray-200"
          />
          <motion.div
            animate={{ scale: [1, 1.03, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute w-80 h-80 rounded-full border border-gray-100"
          />
        </div>

        {/* Center - PalmPe NFC Logo with Premium Glass Effect */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
          className="absolute z-30"
          style={{ width: 90, height: 90 }}
        >
          {/* Frosted Glass Container */}
          <div className="relative w-full h-full rounded-full bg-white/95 backdrop-blur-2xl border border-white/60 flex items-center justify-center"
            style={{
              boxShadow: '0 8px 32px rgba(88, 107, 255, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            }}
          >
            {/* Subtle Breathing Glow */}
            <motion.div
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#586BFF]/30 to-[#9B62FF]/30 blur-xl"
            />

            {/* PalmPe NFC Logo */}
            <motion.div
              animate={{
                y: [0, -2, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="relative z-10"
            >
              <PalmNFCIcon className="w-16 h-16" />
            </motion.div>
          </div>
        </motion.div>

        {/* Use-Case Cards - Positioned in Circle */}
        {useCases.map((useCase, index) => {
          const position = getPosition(index, useCases.length);
          const isSelected = selectedCase?.id === useCase.id;

          return (
            <motion.div
              key={useCase.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: position.x,
                y: position.y
              }}
              whileHover={{ 
                scale: 1.08,
                y: position.y - 3,
                transition: { type: 'spring', stiffness: 400, damping: 15 }
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 25,
                delay: index * 0.08
              }}
              className="absolute cursor-pointer z-20"
              style={{ 
                width: cardSize, 
                height: cardSize,
                transform: `translate(-50%, -50%)`
              }}
              onClick={() => handleCardClick(useCase)}
            >
              {/* Card with Glass Morphism */}
              <motion.div 
                className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center overflow-hidden`}
                style={{
                  boxShadow: isSelected 
                    ? `0 10px 30px ${useCase.color}60, 0 0 0 3px white, 0 0 0 4px ${useCase.color}`
                    : `0 6px 20px ${useCase.color}40`
                }}
                animate={{
                  boxShadow: isSelected 
                    ? `0 10px 30px ${useCase.color}60, 0 0 0 3px white, 0 0 0 4px ${useCase.color}`
                    : `0 6px 20px ${useCase.color}40`
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <useCase.icon className="w-8 h-8 text-white relative z-10 drop-shadow-lg" strokeWidth={2.5} />
                </motion.div>

                {/* Shimmer Effect on Hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transform: 'translateX(-100%)'
                  }}
                  animate={{ x: ['translateX(-100%)', 'translateX(100%)'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </motion.div>

              {/* Label - Below Card */}
              <motion.div 
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.08 + 0.3 }}
              >
                <p className="text-[11px] font-semibold text-gray-700 whitespace-nowrap">
                  {useCase.shortTitle}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Preview Panel - Premium Glass Design */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative"
          >
            {/* Glass Morphism Panel */}
            <div className="relative bg-white/95 backdrop-blur-2xl border border-white/60 rounded-3xl p-5 overflow-hidden"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              }}
            >
              {/* Gradient Background Accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${selectedCase.gradient}`} />

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80 flex items-center justify-center transition-all z-10"
              >
                <X className="w-4 h-4 text-gray-600" />
              </motion.button>

              {/* Content */}
              <div className="pr-10">
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedCase.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <selectedCase.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {selectedCase.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-[10px] text-gray-500">Available in your city</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {selectedCase.description}
                </p>

                {/* CTA Button - Premium Gradient */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: `0 8px 20px ${selectedCase.color}40` }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNavigate}
                  className={`w-full bg-gradient-to-r ${selectedCase.gradient} text-white font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all`}
                >
                  Explore {selectedCase.shortTitle}
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
