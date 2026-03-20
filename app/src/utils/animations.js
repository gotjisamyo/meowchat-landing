import { motion } from 'framer-motion';

// Animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Page transition
export const pageVariants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
    },
  },
};

// Card hover effect
export const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
};

// Button press effect
export const buttonTap = {
  rest: { scale: 1 },
  tap: { scale: 0.95 },
};

// Number counting animation
export const countUp = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

// Animation configurations
export const defaultTransition = {
  duration: 0.3,
  ease: 'easeOut',
};

export const springTransition = {
  type: 'spring',
  stiffness: 200,
  damping: 20,
};

// Motion components for common use cases
export const MotionDiv = motion.div;
export const MotionButton = motion.button;
export const MotionSection = motion.section;

// Animation configurations for different speeds
export const animations = {
  fast: { duration: 0.15 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 },
};

// Entrance animations with delays
export const getDelay = (index, baseDelay = 0.1) => ({
  delay: index * baseDelay,
});

// Combined animations
export const fadeInUpWithDelay = (delay = 0) => ({
  ...fadeInUp,
  animate: {
    ...fadeInUp.animate,
    transition: {
      ...fadeInUp.animate.transition,
      delay,
    },
  },
});

export default {
  fadeIn,
  fadeInUp,
  fadeInDown,
  slideInLeft,
  slideInRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  pageVariants,
  cardHover,
  buttonTap,
  countUp,
  defaultTransition,
  springTransition,
  animations,
  getDelay,
  fadeInUpWithDelay,
};
