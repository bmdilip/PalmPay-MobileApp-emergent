import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Train, 
  GraduationCap, 
  Briefcase, 
  Hospital,
  ShoppingBag,
  Users,
  ChevronRight
} from 'lucide-react';

const UseCaseGrid = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  // Structured use-cases - Enterprise categorization
  const useCases = [
    {
      id: 'metro',
      title: 'Metro & Transit',
      subtitle: 'Palm-based entry & exit',
      icon: Train,
      gradient: 'from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600',
      path: '/use-cases/metro',
      status: 'Live'
    },
    {
      id: 'education',
      title: 'Education',
      subtitle: 'Campus access & payments',
      icon: GraduationCap,
      gradient: 'from-purple-50 to-violet-50',
      iconColor: 'text-purple-600',
      path: '/use-cases/schools',
      status: 'Live'
    },
    {
      id: 'corporate',
      title: 'Corporate',
      subtitle: 'Workplace authentication',
      icon: Briefcase,
      gradient: 'from-green-50 to-emerald-50',
      iconColor: 'text-green-600',
      path: '/use-cases/offices',
      status: 'Live'
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      subtitle: 'Hospital & clinic access',
      icon: Hospital,
      gradient: 'from-red-50 to-rose-50',
      iconColor: 'text-red-600',
      path: '/use-cases/hospitals',
      status: 'Live'
    },
    {
      id: 'retail',
      title: 'Retail',
      subtitle: 'Shop with your palm',
      icon: ShoppingBag,
      gradient: 'from-orange-50 to-amber-50',
      iconColor: 'text-orange-600',
      path: '/use-cases/retail',
      status: 'Live'
    },
    {
      id: 'family',
      title: 'Palm Circle',
      subtitle: 'Family wallet & limits',
      icon: Users,
      gradient: 'from-pink-50 to-rose-50',
      iconColor: 'text-pink-600',
      path: '/use-cases/palm-circle',
      status: 'Live'
    }
  ];

  const handleCardClick = (useCase) => {
    // Check palm registration status
    const isPalmRegistered = localStorage.getItem('palmRegistered') === 'true';
    
    if (!isPalmRegistered) {
      // Redirect to MASTER Device Locator (Find PalmPe Devices)
      navigate('/device-locator', { state: { returnTo: useCase.path } });
    } else {
      // Proceed to use case
      navigate(useCase.path);
    }
  };

  return (
    <div className="w-full px-5 py-6">
      {/* Section Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          PalmPe Use Cases
        </h2>
        <p className="text-sm text-gray-500">
          Where you can use PalmPe
        </p>
      </div>

      {/* Structured Grid - 2x3 on mobile, 3x2 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {useCases.map((useCase, index) => {
          const Icon = useCase.icon;
          const isHovered = hoveredId === useCase.id;

          return (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
              onHoverStart={() => setHoveredId(useCase.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => handleCardClick(useCase)}
              className="cursor-pointer"
            >
              <motion.div
                className={`
                  relative h-32 rounded-2xl p-4 
                  bg-gradient-to-br ${useCase.gradient}
                  border border-gray-200
                  flex flex-col justify-between
                  overflow-hidden
                  transition-all duration-300
                `}
                whileHover={{ 
                  y: -3,
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Status Badge */}
                {useCase.status && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-green-500 text-white rounded-full">
                      {useCase.status}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="flex-shrink-0">
                  <motion.div
                    animate={isHovered ? { 
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 5, 0]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className={`w-9 h-9 ${useCase.iconColor}`} strokeWidth={2} />
                  </motion.div>
                </div>

                {/* Text Content */}
                <div className="flex-1 flex flex-col justify-end">
                  <h3 className="text-base font-bold text-gray-800 mb-0.5 leading-tight">
                    {useCase.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-tight line-clamp-1">
                    {useCase.subtitle}
                  </p>
                </div>

                {/* Chevron Indicator */}
                <motion.div
                  className="absolute bottom-3 right-3"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -5
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default UseCaseGrid;
