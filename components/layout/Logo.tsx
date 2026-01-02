'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LogoProps {
  /**
   * Whether to show the full logo text or just icon
   */
  variant?: 'full' | 'icon';
  
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Custom className
   */
  className?: string;
}

/**
 * Dynamic Logo Component - Visually stunning animated logo
 * Features:
 * - Animated gradient text
 * - Smooth hover effects
 * - Pulse animation
 * - Interactive particle effects on hover
 */
export default function Logo({ 
  variant = 'full', 
  size = 'md',
  className = '' 
}: LogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: variant === 'full' ? 'text-lg' : 'text-xl',
    md: variant === 'full' ? 'text-xl' : 'text-2xl',
    lg: variant === 'full' ? 'text-2xl' : 'text-3xl',
  };

  return (
    <Link
      href="/"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center gap-3 ${sizeClasses[size]} ${className}`}
    >
      {/* Logo Icon/Shape */}
      <motion.div
        className="relative"
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? [0, -5, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
      >
        {/* Animated gradient background circle */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue-500 via-accent-violet-500 to-accent-blue-600 opacity-20 blur-xl"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Main logo shape - abstract geometric design */}
        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue-500 via-accent-blue-600 to-accent-violet-600 flex items-center justify-center shadow-lg shadow-accent-blue-500/30 overflow-hidden">
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
            animate={{
              x: isHovered ? ['0%', '100%'] : '0%',
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
          />
          
          {/* Inner shape for depth */}
          <div className="absolute inset-2 rounded-lg bg-gradient-to-br from-accent-blue-400/50 to-transparent" />
          
          {/* Letter S or abstract shape */}
          <motion.div
            className="relative z-10 text-white font-bold text-lg"
            animate={{
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            S
          </motion.div>
        </div>
      </motion.div>

      {/* Logo Text */}
      {variant === 'full' && (
        <motion.div
          className="relative"
          animate={{
            x: isHovered ? 5 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
        >
          <span className="relative font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            SneakersHub
          </span>
          
          {/* Animated gradient underline */}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-accent-blue-500 via-accent-violet-500 to-accent-blue-500"
            initial={{ width: 0 }}
            animate={{
              width: isHovered ? '100%' : 0,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
          />
        </motion.div>
      )}
    </Link>
  );
}

