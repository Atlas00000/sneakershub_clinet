'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

interface ErrorFallbackProps {
  /**
   * The error that was caught
   */
  error: Error;
  
  /**
   * Function to reset the error boundary
   */
  resetErrorBoundary: () => void;
  
  /**
   * Optional custom title
   */
  title?: string;
  
  /**
   * Optional custom message
   */
  message?: string;
  
  /**
   * Whether to show error details (stack trace)
   */
  showDetails?: boolean;
  
  /**
   * Optional icon/emoji to display
   */
  icon?: React.ReactNode;
}

/**
 * ErrorFallback Component
 * 
 * Displays a user-friendly error message when an error boundary catches an error.
 * Provides options to retry, go back, or view error details.
 * 
 * @example
 * <ErrorFallback
 *   error={error}
 *   resetErrorBoundary={resetErrorBoundary}
 *   title="Something went wrong"
 * />
 */
export default function ErrorFallback({
  error,
  resetErrorBoundary,
  title = 'Something went wrong',
  message,
  showDetails = process.env.NODE_ENV === 'development',
  icon = '⚠️',
}: ErrorFallbackProps) {
  const [showStack, setShowStack] = React.useState(false);

  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="glass-panel rounded-2xl p-8 max-w-lg w-full text-center space-y-6"
      >
        {/* Icon */}
        <div className="text-6xl mb-4">{icon}</div>

        {/* Title */}
        <h2 className="text-heading-l font-bold text-white">{title}</h2>

        {/* Message */}
        <p className="text-body-m text-slate-300">
          {message || 'An unexpected error occurred. Please try again or contact support if the problem persists.'}
        </p>

        {/* Error details (development only) */}
        {showDetails && error && (
          <div className="space-y-2 text-left">
            <button
              onClick={() => setShowStack(!showStack)}
              className="text-body-s text-accent-blue-400 hover:text-accent-blue-300 transition-colors"
            >
              {showStack ? 'Hide' : 'Show'} error details
            </button>
            
            {showStack && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-slate-900/50 rounded-lg p-4 overflow-auto max-h-64"
              >
                <p className="text-body-s font-mono text-red-400 break-all">
                  {error.message}
                </p>
                {error.stack && (
                  <pre className="text-body-xs font-mono text-slate-400 mt-2 whitespace-pre-wrap break-all">
                    {error.stack}
                  </pre>
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            onClick={resetErrorBoundary}
            variant="primary"
            size="md"
          >
            Try Again
          </Button>
          
          <Button
            onClick={() => window.location.href = '/'}
            variant="secondary"
            size="md"
          >
            Go Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

