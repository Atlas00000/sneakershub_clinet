'use client';

import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Animated Logo Component for Loading Screen
 * Features pulsing, rotating, and glowing effects
 */
export default function AnimatedLogo({ size = 'lg' }: AnimatedLogoProps) {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className="relative flex flex-col items-center gap-6">
      {/* Main logo container */}
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 ${sizes[size]} rounded-2xl bg-gradient-to-br from-accent-blue-500 via-accent-violet-500 to-accent-blue-600 opacity-30 blur-2xl`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Logo shape */}
        <div className={`relative ${sizes[size]} rounded-2xl bg-gradient-to-br from-accent-blue-500 via-accent-blue-600 to-accent-violet-600 flex items-center justify-center shadow-2xl shadow-accent-blue-500/50 overflow-hidden`}>
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
          
          {/* Letter S */}
          <motion.span
            className={`relative z-10 text-white font-bold ${size === 'sm' ? 'text-2xl' : size === 'md' ? 'text-3xl' : 'text-4xl'}`}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            S
          </motion.span>
        </div>
      </motion.div>

      {/* Logo text */}
      <motion.div
        className={textSizes[size]}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
          SneakersHub
        </span>
      </motion.div>
    </div>
  );
}

