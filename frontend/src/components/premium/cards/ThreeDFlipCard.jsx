import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ThreeDFlipCard = ({ 
  frontContent, 
  backContent, 
  height = '200px',
  className = '' 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        perspective: '1000px',
        height: height
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s'
        }}
        animate={{ 
          rotateY: isFlipped ? 180 : 0 
        }}
        transition={{ duration: 0.6 }}
      >
        {/* Front Face */}
        <div
          className="absolute w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <div className="w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center p-6">
            {frontContent}
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-[#00C8D6] to-[#008B95] text-white rounded-xl shadow-lg flex items-center justify-center p-6">
            {backContent}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThreeDFlipCard;