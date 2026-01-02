'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProgressIndicatorProps {
  /**
   * Progress value (0-100)
   */
  progress?: number;
  
  /**
   * Whether to use animated progress (simulated)
   */
  animated?: boolean;
  
  /**
   * Loading message
   */
  message?: string;
}

/**
 * Animated Progress Indicator Component
 * Shows loading progress with smooth animations
 */
export default function ProgressIndicator({
  progress,
  animated = true,
  message = 'Loading...',
}: ProgressIndicatorProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (animated && progress === undefined) {
      // Simulate progress
      const interval = setInterval(() => {
        setAnimatedProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 200);

      return () => clearInterval(interval);
    } else if (progress !== undefined) {
      setAnimatedProgress(progress);
    }
  }, [animated, progress]);

  const currentProgress = progress !== undefined ? progress : animatedProgress;

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Progress bar */}
      <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent-blue-500/20 via-accent-violet-500/20 to-accent-blue-500/20"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Progress fill */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-blue-500 via-accent-violet-500 to-accent-blue-600 rounded-full shadow-lg shadow-accent-blue-500/50"
          initial={{ width: 0 }}
          animate={{ width: `${currentProgress}%` }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
        >
          {/* Shimmer effect on progress */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      </div>

      {/* Loading message */}
      <motion.p
        key={message}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-body-m text-slate-300 text-center font-medium"
      >
        {message}
      </motion.p>
    </div>
  );
}

