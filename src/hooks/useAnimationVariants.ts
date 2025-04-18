import { Variants } from "framer-motion";

export const useAnimationVariants = () => {
  // Fade in and scale up
  const fadeIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  // Slide in from left
  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      x: -30,
      transition: { duration: 0.3 },
    },
  };

  // Slide in from right
  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      x: 30,
      transition: { duration: 0.3 },
    },
  };

  // Slide up
  const slideUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: custom * 0.15,
      },
    }),
    exit: {
      opacity: 0,
      y: 40,
      transition: { duration: 0.3 },
    },
  };

  // Pop in staggered children
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  // Item animation for staggered containers
  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  // Hover and tap animations
  const buttonHover = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  const buttonTap = {
    scale: 0.95,
    transition: { duration: 0.1 },
  };

  return {
    fadeIn,
    slideInLeft,
    slideInRight,
    slideUp,
    staggerContainer,
    staggerItem,
    buttonHover,
    buttonTap,
  };
};
