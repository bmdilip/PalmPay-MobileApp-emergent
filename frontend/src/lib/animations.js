// PalmPay Animation System - Framer Motion Utilities
// Following 300-400ms timing system + 60fps performance standards

// ============================================
// TIMING SYSTEM (300-400ms standard)
// ============================================
export const animationTiming = {
  fast: 0.2,        // 200ms - micro-interactions
  normal: 0.3,      // 300ms - standard
  slow: 0.4,        // 400ms - hero transitions
  verySlow: 0.6     // 600ms - complex animations
};

// ============================================
// EASING CURVES
// ============================================
export const easings = {
  smooth: [0.4, 0, 0.2, 1],           // Standard smooth
  spring: { type: "spring", damping: 20, stiffness: 300 }, // Bouncy
  springSmooth: { type: "spring", damping: 30, stiffness: 200 },
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
};

// ============================================
// FADE ANIMATIONS
// ============================================
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: animationTiming.normal }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: animationTiming.normal, ease: easings.smooth }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: animationTiming.normal, ease: easings.smooth }
};

// ============================================
// SLIDE ANIMATIONS
// ============================================
export const slideInLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
  transition: { duration: animationTiming.normal, ease: easings.smooth }
};

export const slideInRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
  transition: { duration: animationTiming.normal, ease: easings.smooth }
};

// ============================================
// SCALE ANIMATIONS
// ============================================
export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { duration: animationTiming.normal, ease: easings.smooth }
};

export const popIn = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
  transition: easings.springSmooth
};

// ============================================
// STAGGER ANIMATIONS (for lists)
// ============================================
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: animationTiming.normal, ease: easings.smooth }
  }
};

// ============================================
// HOVER ANIMATIONS
// ============================================
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

export const hoverGlow = {
  boxShadow: "0 0 20px rgba(88, 107, 255, 0.5)",
  transition: { duration: 0.2 }
};

export const tapScale = {
  scale: 0.95
};

// ============================================
// SPECIALIZED ANIMATIONS
// ============================================

// Number Ticker Animation
export const numberTicker = {
  initial: { scale: 1.2, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3, ease: easings.smooth }
};

// Success Checkmark
export const successCheck = {
  initial: { scale: 0, rotate: -180 },
  animate: { scale: 1, rotate: 0 },
  transition: easings.spring
};

// Loading Spinner
export const spinAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Pulse Animation (for badges)
export const pulseAnimation = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Skeleton Shimmer
export const shimmerAnimation = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// ============================================
// MODAL/DIALOG ANIMATIONS
// ============================================
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export const modalContent = {
  initial: { scale: 0.9, opacity: 0, y: 20 },
  animate: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.9, opacity: 0, y: 20 },
  transition: { duration: 0.3, ease: easings.smooth }
};

// ============================================
// PAGE TRANSITIONS
// ============================================
export const pageTransition = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: animationTiming.slow, ease: easings.smooth }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Get stagger delay for item index
export const getStaggerDelay = (index, baseDelay = 0.1) => {
  return index * baseDelay;
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get safe animation (respects prefers-reduced-motion)
export const getSafeAnimation = (animation) => {
  if (prefersReducedMotion()) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      transition: { duration: 0 }
    };
  }
  return animation;
};

// ============================================
// EXPORT PRESETS
// ============================================
export const animationPresets = {
  fadeIn,
  fadeInUp,
  fadeInDown,
  slideInLeft,
  slideInRight,
  scaleIn,
  popIn,
  staggerContainer,
  staggerItem,
  numberTicker,
  successCheck,
  spinAnimation,
  pulseAnimation,
  shimmerAnimation,
  modalBackdrop,
  modalContent,
  pageTransition,
  hoverScale,
  hoverGlow,
  tapScale
};
