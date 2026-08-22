import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface PawPopsicleProps {
  delay?: number;
  position?: 'left' | 'right';
}

function RunningPaw({ delay = 0, position = 'left' }: PawPopsicleProps) {
  const positionStyles = {
    left: {
      left: '0px',
      transformOrigin: 'center bottom',
    },
    right: {
      right: '0px',
      transformOrigin: 'center bottom',
    }
  };

  return (
    <motion.span
      className="absolute text-3xl z-50"
      style={{ ...positionStyles[position], bottom: '100px' }}
      initial={{ y: '0px', rotate: 0 }}
      animate={{
        y: ['-5px', '0px', '-5px'],
        rotate: ['0deg', '-15deg', '0deg', '-15deg'],
      }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: delay,
        ease: 'ease-in-out',
      }}
      key={position}
    >
      🐾
    </motion.span>
  );
}

interface AnimatedPawRunningProps {
  position?: 'left' | 'right' | 'center';
  delay?: number;
  scale?: number;
  opacity?: number;
}

export function AnimatedPaw({ scale = 1, opacity = 1 }: AnimatedPawRunningProps = {}) {
  // Single animated paw that bounces and wiggles
  return (
    <motion.span
      className="flex items-center justify-center relative"
      style={{ 
        transform: `scale(${scale})`,
        opacity
      }}
      initial={{ y: 0, rotate: 0 }}
      animate={{
        y: [0, -3, 0, -2, 0],
        rotate: [-5, 5, -5, 8, -8, 0],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 5,
        ease: 'easeInOut',
      }}
      style={{ animation: 'bounceWalking ease-in-out 0.5s infinite' }}
    >
      🐾
    </motion.span>
  );
}

// Alternative: Double paws for running dog effect
export const RunningDogs = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[200px]">
      {/* Following dog */}
      <motion.div
        className="absolute z-20"
        initial={{ x: '-200px' }}
        animate={{ x: ['0px', '-10px', '-100px'] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="text-5xl inline-block" style={{ transform: 'scaleX(-1)' }}>🐕</div>
      </motion.div>

      {/* Leading dog */}
      <motion.div
        className="absolute z-30"
        initial={{ x: '-200px', opacity: 0 }}
        animate={{
          x: ['0px', '-10px', '-100px'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
          delay: 0.5
        }}
      >
        <div className="text-5xl inline-block" style={{ transform: 'scaleX(-1)' }}>🐕</div>
      </motion.div>

      {/* Running paws */}
      <div className="absolute bottom-0 left-1/4 flex gap-8">
        <motion.span className="text-2xl" initial={{ y: 0 }} animate={{ y: [0, -2, 0] }} transition={{ duration: 0.4, repeat: Infinity, delay: 0 }} style={{ animation: 'bounce 0.4s infinite' }}>🐾</motion.span>
        <motion.span className="text-2xl" initial={{ y: 0 }} animate={{ y: [0, -2, 0] }} transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }} style={{ animation: 'bounce 0.4s infinite' }} style={{ animationDelay: '0.2s' }}>🐾</motion.span>
      </div>
    </div>
  );
};

// CSS keyframes to inject
export const pawAnimationStyles = `
  @keyframes bounceWalking {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    25% {
      transform: translateY(-5px) scale(1.05);
    }
    50% {
      transform: translateY(0) scale(1);
    }
    75% {
      transform: translateY(-3px) scale(1.02);
    }
  }

  .walking-animation {
    animation: bounceWalking 0.7s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
  }
  
  .running-paw {
    animation: bounce 0.4s ease-in-out infinite;
  }
`;

export default AnimatedPaw;