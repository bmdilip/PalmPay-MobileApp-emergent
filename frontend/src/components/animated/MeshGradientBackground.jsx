import React from 'react';
import { motion } from 'framer-motion';

const MeshGradientBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(88, 107, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(155, 98, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(0, 200, 214, 0.1) 0%, transparent 50%)'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
      />
    </div>
  );
};

export default MeshGradientBackground;