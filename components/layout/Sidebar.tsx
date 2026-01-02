'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface SidebarProps {
  /**
   * Content to render inside the sidebar
   */
  children: ReactNode;
  
  /**
   * Whether the sidebar is open (for mobile)
   */
  isOpen?: boolean;
  
  /**
   * Callback when sidebar should close (mobile)
   */
  onClose?: () => void;
  
  /**
   * Sidebar width (default: 360px)
   */
  width?: string;
  
  /**
   * Whether this is a mobile viewport
   */
  isMobile?: boolean;
}

/**
 * Sidebar Component - Glassmorphic control panel sidebar
 * 
 * Features:
 * - Glassmorphic dark design
 * - Smooth slide-in animation (mobile)
 * - Fixed positioning on desktop
 * - Custom scrollbar styling
 * - Responsive behavior
 */
export default function Sidebar({
  children,
  isOpen = true,
  onClose,
  width = '360px',
  isMobile = false,
}: SidebarProps) {
  // Desktop: Always visible, fixed position
  if (!isMobile) {
    return (
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.0, 0, 0.2, 1] }}
        style={{ width }}
        className="glass-sidebar fixed right-0 top-16 bottom-0 overflow-y-auto z-40"
      >
        <div className="p-6 space-y-6">
          {children}
        </div>
      </motion.aside>
    );
  }

  // Mobile: Slide-in drawer
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Sidebar */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ width: '100vw', maxWidth: width }}
            className="glass-sidebar fixed right-0 top-0 bottom-0 overflow-y-auto z-50"
          >
            {/* Close Button (Mobile) */}
            {onClose && (
              <div className="sticky top-0 glass-dark border-b border-slate-700/50 p-4 flex justify-end z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Close sidebar"
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
              </div>
            )}
            
            <div className="p-6 space-y-6">
              {children}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

