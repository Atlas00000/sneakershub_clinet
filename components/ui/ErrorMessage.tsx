'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  /**
   * Error message text
   */
  message: string;
  
  /**
   * Error title (optional)
   */
  title?: string;
  
  /**
   * Action button (optional)
   */
  action?: ReactNode;
  
  /**
   * Variant style
   */
  variant?: 'default' | 'compact' | 'full';
  
  /**
   * Whether to show an icon
   */
  showIcon?: boolean;
}

/**
 * ErrorMessage Component - Displays error states with styling
 * 
 * Features:
 * - Animated error display
 * - Optional title and action button
 * - Multiple variants
 * - Icon support
 */
export default function ErrorMessage({
  message,
  title,
  action,
  variant = 'default',
  showIcon = true,
}: ErrorMessageProps) {
  const variants = {
    default: 'p-4 rounded-xl',
    compact: 'p-3 rounded-lg',
    full: 'p-6 rounded-2xl',
  };
  
  if (variant === 'full') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'glass-card-dark border-2 border-error/50',
          variants[variant],
          'text-center'
        )}
      >
        {showIcon && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className="text-5xl mb-4"
          >
            ⚠️
          </motion.div>
        )}
        {title && (
          <h3 className="text-heading-m font-semibold text-error mb-2">
            {title}
          </h3>
        )}
        <p className="text-body-m text-slate-300 mb-4">
          {message}
        </p>
        {action && <div>{action}</div>}
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'glass-card-dark border border-error/50',
        variants[variant],
        'flex items-start gap-3'
      )}
    >
      {showIcon && (
        <div className="text-error text-xl flex-shrink-0 mt-0.5">
          ⚠️
        </div>
      )}
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-body-m font-semibold text-error mb-1">
            {title}
          </h4>
        )}
        <p className={cn(
          'text-body-s',
          title ? 'text-slate-400' : 'text-error'
        )}>
          {message}
        </p>
        {action && <div className="mt-3">{action}</div>}
      </div>
    </motion.div>
  );
}

