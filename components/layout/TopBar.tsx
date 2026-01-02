'use client';

import { motion } from 'framer-motion';
import Logo from './Logo';
import NavMenu from './NavMenu';
import HeaderActions from './HeaderActions';
import HeaderGradient from './HeaderGradient';

interface TopBarProps {
  /**
   * Show back button (legacy support)
   */
  showBackButton?: boolean;
  
  /**
   * Custom back link URL (legacy support)
   */
  backHref?: string;
  
  /**
   * Additional content to render on the right side (legacy support)
   */
  rightContent?: React.ReactNode;
  
  /**
   * Navigation menu items
   */
  navItems?: Array<{ href: string; label: string; badge?: number | string }>;
  
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
   * Enable animated gradient background
   */
  enableGradient?: boolean;
  
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
 * Revamped TopBar Component - Visually stunning, interactive header
 * 
 * Features:
 * - Dynamic animated logo with gradient effects
 * - Sleek navigation menu with smooth animations
 * - Interactive action buttons (cart, user)
 * - Animated gradient background
 * - Glassmorphic design with enhanced visuals
 * - Smooth transitions and hover effects
 */
export default function TopBar({
  showBackButton = false,
  backHref = '/',
  rightContent,
  navItems,
  showCart = true,
  cartCount = 0,
  showUser = true,
  enableGradient = true,
  onCartClick,
  onUserClick,
}: TopBarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.0, 0, 0.2, 1] }}
      className="relative h-20 glass-dark border-b border-slate-700/30 px-8 flex items-center justify-between sticky top-0 z-50 overflow-hidden"
    >
      {/* Animated gradient background */}
      <HeaderGradient enabled={enableGradient} />

      {/* Left Section - Logo and Navigation */}
      <div className="relative z-10 flex items-center gap-12">
        <Logo variant="full" size="md" />
        <NavMenu items={navItems} />
      </div>

      {/* Right Section - Actions */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Custom right content (legacy support) */}
        {rightContent ? (
          rightContent
        ) : (
          <HeaderActions
            showCart={showCart}
            cartCount={cartCount}
            showUser={showUser}
            onCartClick={onCartClick}
            onUserClick={onUserClick}
          />
        )}
      </div>

      {/* Bottom border gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue-500/50 to-transparent" />
    </motion.header>
  );
}
