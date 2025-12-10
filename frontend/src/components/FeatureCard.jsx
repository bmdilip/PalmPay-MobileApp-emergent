import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  Lock,
  Clock,
  Globe,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  Star,
  Users,
  Layers,
  Target,
  Rocket,
  Heart,
  Gift
} from 'lucide-react';

const FeatureCard = ({ 
  icon: CustomIcon,
  iconType = 'shield',
  title,
  description,
  color = 'purple',
  gradient,
  index = 0 
}) => {
  const iconMap = {
    shield: Shield,
    zap: Zap,
    lock: Lock,
    clock: Clock,
    globe: Globe,
    sparkles: Sparkles,
    trending: TrendingUp,
    award: Award,
    check: CheckCircle2,
    star: Star,
    users: Users,
    layers: Layers,
    target: Target,
    rocket: Rocket,
    heart: Heart,
    gift: Gift
  };

  const Icon = CustomIcon || iconMap[iconType] || Shield;

  const colorSchemes = {
    purple: {
      gradient: 'from-purple-500 to-indigo-600',
      bg: 'bg-purple-50',
      icon: 'text-purple-600',
      glow: 'shadow-purple-500/50'
    },
    blue: {
      gradient: 'from-blue-500 to-cyan-600',
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      glow: 'shadow-blue-500/50'
    },
    green: {
      gradient: 'from-green-500 to-emerald-600',
      bg: 'bg-green-50',
      icon: 'text-green-600',
      glow: 'shadow-green-500/50'
    },
    orange: {
      gradient: 'from-orange-500 to-amber-600',
      bg: 'bg-orange-50',
      icon: 'text-orange-600',
      glow: 'shadow-orange-500/50'
    },
    pink: {
      gradient: 'from-pink-500 to-rose-600',
      bg: 'bg-pink-50',
      icon: 'text-pink-600',
      glow: 'shadow-pink-500/50'
    },
    red: {
      gradient: 'from-red-500 to-rose-600',
      bg: 'bg-red-50',
      icon: 'text-red-600',
      glow: 'shadow-red-500/50'
    }
  };

  const scheme = colorSchemes[color] || colorSchemes.purple;
  const finalGradient = gradient || scheme.gradient;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group relative overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity">
        <div className={`absolute inset-0 bg-gradient-to-br ${finalGradient}`} />
      </div>

      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.2 }}
        className="relative mb-4"
      >
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${finalGradient} flex items-center justify-center shadow-lg ${scheme.glow} group-hover:shadow-2xl transition-all duration-300`}>
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <Icon className="w-7 h-7 text-white relative z-10" />
        </div>

        {/* Floating particles */}
        <motion.div
          className={`absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gradient-to-br ${finalGradient}`}
          animate={{
            y: [0, -10, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h4 className="text-base font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
          {title}
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
        <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${finalGradient} rounded-bl-full`} />
      </div>
    </motion.div>
  );
};

export default FeatureCard;
