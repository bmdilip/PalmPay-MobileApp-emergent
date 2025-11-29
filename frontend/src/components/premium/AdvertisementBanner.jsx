import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AdvertisementBanner = ({ onClose, onClick }) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const ads = [
    {
      id: 1,
      title: "Invest Smart",
      description: "Start your investment journey with zero fees",
      cta: "Explore",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=80&h=120&fit=crop",
      bgGradient: "linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%)",
      link: "/services/mutual-funds"
    },
    {
      id: 2,
      title: "Get Cashback",
      description: "Earn up to ₹500 on every payment",
      cta: "Learn More",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=120&fit=crop",
      bgGradient: "linear-gradient(135deg, rgba(245, 87, 108, 0.15) 0%, rgba(240, 147, 251, 0.1) 100%)",
      link: "/cashback-rewards"
    },
    {
      id: 3,
      title: "Insurance Plans",
      description: "Protect your family with affordable plans",
      cta: "View Plans",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=80&h=120&fit=crop",
      bgGradient: "linear-gradient(135deg, rgba(79, 172, 254, 0.15) 0%, rgba(0, 242, 254, 0.1) 100%)",
      link: "/services/insurance"
    },
  ];

  const currentAd = ads[currentAdIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const handleClick = () => {
    onClick?.(currentAd);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentAdIndex}
        className="relative mx-5 my-4 rounded-xl overflow-hidden cursor-pointer"
        style={{
          background: currentAd.bgGradient,
          border: '1px solid rgba(0, 200, 214, 0.2)',
          height: '120px'
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        onClick={handleClick}
        whileHover={{
          scale: 1.01,
          boxShadow: '0 4px 12px rgba(0, 200, 214, 0.15)'
        }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center h-full p-4 gap-3">
          {/* Content */}
          <div className="flex-1 space-y-2">
            <h3 className="text-base font-semibold text-gray-800">
              {currentAd.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">
              {currentAd.description}
            </p>
            <span className="text-xs font-semibold text-[#00C8D6]">
              {currentAd.cta} →
            </span>
          </div>

          {/* Image */}
          <div className="w-20 h-full flex-shrink-0">
            <img
              src={currentAd.image}
              alt={currentAd.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Close Button */}
        <motion.button
          className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white transition-colors z-10"
          onClick={handleClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-3 h-3 text-gray-600" />
        </motion.button>

        {/* Ad indicator dots */}
        <div className="absolute bottom-2 right-2 flex gap-1">
          {ads.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentAdIndex
                  ? 'bg-[#00C8D6] w-4'
                  : 'bg-gray-400/50'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdvertisementBanner;