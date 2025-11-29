import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../../lib/animations';

const PatentPendingBadge = () => {
  const patents = [
    {
      id: 1,
      title: 'Patent Pending: Biometric Palm-Vein Authentication',
      description: 'Securing payments with advanced biometric technology'
    },
    {
      id: 2,
      title: 'Patent Pending: Dual-Layer Security Protocol',
      description: 'Enterprise-grade multi-factor authentication'
    }
  ];

  return (
    <motion.div
      className="mx-5 mt-4 mb-4"
      {...fadeInUp}
      transition={{ delay: 0.2 }}
    >
      <div className="patent-pending-section bg-gradient-to-br from-[rgba(0,200,214,0.08)] to-[rgba(0,31,63,0.04)] border border-[rgba(0,200,214,0.2)] rounded-xl p-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-3"
        >
          {patents.map((patent, index) => (
            <motion.div
              key={patent.id}
              variants={staggerItem}
              className="patent-badge flex items-start gap-2 p-3 bg-[rgba(0,200,214,0.1)] border border-[rgba(0,200,214,0.3)] rounded-lg group hover:bg-[rgba(0,200,214,0.15)] transition-all duration-300"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="flex-shrink-0 mt-0.5"
              >
                <Lock className="w-4 h-4 text-[#00C8D6]" />
              </motion.div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#00C8D6] leading-tight">
                  {patent.title}
                </p>
                <p className="text-[10px] text-gray-600 mt-0.5">
                  {patent.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="patent-credibility-text text-center mt-3 pt-3 border-t border-[rgba(0,200,214,0.15)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-[11px] text-gray-500 italic">
            Protecting your innovation and investment
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PatentPendingBadge;