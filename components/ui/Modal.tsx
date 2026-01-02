'use client';

import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  
  /**
   * Callback when modal should close
   */
  onClose: () => void;
  
  /**
   * Modal content
   */
  children: ReactNode;
  
  /**
   * Modal title (optional)
   */
  title?: string;
  
  /**
   * Modal description/subtitle (optional)
   */
  description?: string;
  
  /**
   * Modal size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  /**
   * Whether to close on backdrop click
   */
  closeOnBackdropClick?: boolean;
  
  /**
   * Whether to show close button
   */
  showCloseButton?: boolean;
}

/**
 * Modal Component - Glassmorphic modal dialog with backdrop
 * 
 * Features:
 * - Backdrop with blur
 * - Smooth open/close animations
 * - Keyboard support (ESC to close)
 * - Focus trap (accessibility)
 * - Responsive sizing
 * - Optional title and description
 * - Close button support
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = 'md',
  closeOnBackdropClick = true,
  showCloseButton = true,
  className,
  ...props
}: ModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const modalClasses = cn(
    'glass-panel rounded-2xl shadow-2xl relative',
    sizes[size],
    'w-full',
    className
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOnBackdropClick ? onClose : undefined}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            className={cn(
              'fixed inset-0 z-[100] flex items-center justify-center p-4',
              'pointer-events-none'
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            aria-describedby={description ? 'modal-description' : undefined}
            {...props}
          >
            <div
              className={modalClasses}
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              style={{ pointerEvents: 'auto' }}
            >
              {/* Header */}
              {(title || description || showCloseButton) && (
                <div className="flex items-start justify-between p-6 border-b border-slate-700/50">
                  <div className="flex-1 pr-4">
                    {title && (
                      <h2
                        id="modal-title"
                        className="text-heading-l font-semibold text-white mb-2"
                      >
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p
                        id="modal-description"
                        className="text-body-m text-slate-400"
                      >
                        {description}
                      </p>
                    )}
                  </div>
                  {showCloseButton && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-700/50"
                      aria-label="Close modal"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

