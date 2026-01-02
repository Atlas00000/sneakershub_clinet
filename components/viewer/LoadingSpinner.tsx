'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  /**
   * Loading message
   */
  message?: string;
  
  /**
   * Spinner size
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Full screen overlay
   */
  fullScreen?: boolean;
}

/**
 * Loading spinner component for 3D model loading with branded styling
 */
export default function LoadingSpinner({ 
  message = 'Loading 3D model...',
  size = 'md',
  fullScreen = true,
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-8 h-8 border-2',
    md: 'w-16 h-16 border-4',
    lg: 'w-24 h-24 border-4',
  };
  
  const containerClass = fullScreen 
    ? 'absolute inset-0 flex items-center justify-center bg-charcoal-900/80 backdrop-blur-sm z-50'
    : 'flex items-center justify-center';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={containerClass}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Gradient spinner */}
        <div className="relative">
          <div className={`
            ${sizes[size]} 
            border-accent-blue-500/30 
            border-t-accent-blue-500 
            rounded-full 
            animate-spin
          `} />
          {size !== 'sm' && (
            <div className={`
              absolute inset-0 
              ${sizes[size]} 
              border-accent-violet-500/20 
              border-t-accent-violet-500 
              rounded-full 
              animate-spin
            `} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          )}
        </div>
        
        {/* Loading text */}
        {message && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-body-m text-slate-300 font-medium"
          >
            {message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

