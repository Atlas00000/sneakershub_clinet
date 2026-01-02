'use client';

import { motion } from 'framer-motion';

interface ErrorBackgroundProps {
  /**
   * Error code (for custom styling)
   */
  code?: string;
}

/**
 * Animated Background for Error Pages
 * Creates dramatic, engaging visual effects
 */
export default function ErrorBackground({ code = '404' }: ErrorBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-accent-blue-500/25 via-accent-violet-500/20 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 150, 0],
          y: [0, 200, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-1/4 w-[900px] h-[900px] bg-gradient-to-tl from-accent-violet-500/30 via-accent-blue-500/20 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, -180, 0],
          y: [0, -150, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Pulsing center effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Scattered particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-gradient-to-r from-accent-blue-500/50 to-accent-violet-500/50 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

