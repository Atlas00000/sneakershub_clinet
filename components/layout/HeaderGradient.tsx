'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HeaderGradientProps {
  /**
   * Enable animated gradient background
   */
  enabled?: boolean;
}

/**
 * Animated Gradient Background for Header
 * Features:
 * - Slow-moving gradient orbs
 * - Subtle color shifts
 * - Performance optimized
 * - Non-intrusive visual enhancement
 */
export default function HeaderGradient({ enabled = true }: HeaderGradientProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent-blue-500/20 via-accent-violet-500/10 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-bl from-accent-violet-500/15 via-accent-blue-500/10 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Mouse-responsive gradient */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
        }}
        animate={{
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue-500/30 to-transparent" />
    </div>
  );
}

