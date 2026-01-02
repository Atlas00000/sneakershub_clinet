'use client';

import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  /**
   * Variant of background animation
   */
  variant?: 'loading' | 'error';
}

/**
 * Animated Background Component
 * Creates stunning animated gradient orbs and particles
 */
export default function AnimatedBackground({ variant = 'loading' }: AnimatedBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary gradient orbs */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-accent-blue-500/30 via-accent-violet-500/20 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 150, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-accent-violet-500/25 via-accent-blue-500/15 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, -120, 0],
          y: [0, -100, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Secondary accent orbs */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-accent-blue-500/15 to-accent-violet-500/15 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Pulsing center orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-accent-blue-500/40 to-accent-violet-500/40 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

