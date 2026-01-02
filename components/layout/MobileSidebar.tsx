'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MobileSidebarProps {
  /**
   * Whether the sidebar is open
   */
  isOpen: boolean;
  
  /**
   * Callback when sidebar should close
   */
  onClose: () => void;
  
  /**
   * Sidebar content
   */
  children: ReactNode;
  
  /**
   * Optional title for the sidebar
   */
  title?: string;
}

/**
 * Mobile Sidebar Component
 * 
 * Bottom panel sidebar for mobile split-screen view
 * Features:
 * - Takes up lower half of screen when open
 * - Smooth slide-in animation from bottom
 * - No backdrop overlay (both viewport and controls visible)
 * - Touch-friendly design
 * - Split-screen layout with viewport
 */
export default function MobileSidebar({
  isOpen,
  onClose,
  children,
  title,
}: MobileSidebarProps) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: isOpen ? 0 : '100%' }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 300,
      }}
      className="fixed inset-x-0 bottom-0 bg-charcoal-900 border-t border-slate-700/50 z-40 flex flex-col shadow-2xl overflow-hidden"
      style={{
        height: isOpen ? '50%' : '0%',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-charcoal-900/95 backdrop-blur-sm flex-shrink-0">
        {title && (
          <h2 className="text-heading-m font-semibold text-white">
            {title}
          </h2>
        )}
        <button
          onClick={onClose}
          className="ml-auto p-2 rounded-lg hover:bg-slate-800 active:bg-slate-700 transition-colors touch-manipulation"
          aria-label="Close sidebar"
        >
          <svg
            className="w-6 h-6 text-slate-300"
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
        </button>
      </div>

      {/* Content Area */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      )}
    </motion.div>
  );
}

