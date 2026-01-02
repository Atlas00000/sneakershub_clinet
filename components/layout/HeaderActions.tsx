'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface HeaderActionsProps {
  /**
   * Show cart button
   */
  showCart?: boolean;
  
  /**
   * Cart items count
   */
  cartCount?: number;
  
  /**
   * Show user menu
   */
  showUser?: boolean;
  
  /**
   * Custom className
   */
  className?: string;
  
  /**
   * Cart click handler
   */
  onCartClick?: () => void;
  
  /**
   * User menu click handler
   */
  onUserClick?: () => void;
}

/**
 * Header Actions Component - Interactive action buttons
 * Features:
 * - Animated cart with item count badge
 * - User profile button with dropdown indicator
 * - Smooth hover and click animations
 * - Gradient glow effects
 */
export default function HeaderActions({
  showCart = true,
  cartCount = 0,
  showUser = true,
  className = '',
  onCartClick,
  onUserClick,
}: HeaderActionsProps) {
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isUserHovered, setIsUserHovered] = useState(false);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Cart Button */}
      {showCart && (
        <motion.button
          onMouseEnter={() => setIsCartHovered(true)}
          onMouseLeave={() => setIsCartHovered(false)}
          onClick={onCartClick}
          className="relative p-2.5 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-accent-blue-500/50 transition-all duration-200 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated gradient background on hover */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-blue-500/0 via-accent-blue-500/20 to-accent-blue-500/0 opacity-0 group-hover:opacity-100"
            animate={{
              opacity: isCartHovered ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Cart Icon */}
          <svg
            className="relative z-10 w-5 h-5 text-slate-300 group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>

          {/* Cart Count Badge */}
          {cartCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-accent-blue-500 to-accent-violet-500 rounded-full flex items-center justify-center shadow-lg border-2 border-charcoal-900 z-20"
            >
              <span className="text-[10px] font-bold text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            </motion.div>
          )}

          {/* Pulsing glow effect when has items */}
          {cartCount > 0 && (
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-blue-500/30 to-accent-violet-500/30"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
        </motion.button>
      )}

      {/* User Profile Button */}
      {showUser && (
        <motion.button
          onMouseEnter={() => setIsUserHovered(true)}
          onMouseLeave={() => setIsUserHovered(false)}
          onClick={onUserClick}
          className="relative p-2.5 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-accent-blue-500/50 transition-all duration-200 group overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated gradient background on hover */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-violet-500/0 via-accent-violet-500/20 to-accent-violet-500/0"
            animate={{
              opacity: isUserHovered ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          />

          {/* User Icon */}
          <svg
            className="relative z-10 w-5 h-5 text-slate-300 group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>

          {/* Subtle shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'linear',
            }}
          />
        </motion.button>
      )}
    </div>
  );
}

