'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  badge?: number | string;
}

interface NavMenuProps {
  items?: NavItem[];
  className?: string;
}

/**
 * Dynamic Navigation Menu Component
 * Features:
 * - Smooth underline animation
 * - Active state indicators
 * - Hover effects with gradient highlights
 * - Badge support for notifications
 */
export default function NavMenu({ 
  items = [],
  className = '' 
}: NavMenuProps) {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Default navigation items if none provided
  const defaultItems: NavItem[] = [
    { href: '/', label: 'Design' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/explore', label: 'Explore' },
  ];

  const navItems = items.length > 0 ? items : defaultItems;

  return (
    <nav className={cn('flex items-center gap-1', className)}>
      {navItems.map((item, index) => {
        const isActive = pathname === item.href || 
                        (item.href !== '/' && pathname?.startsWith(item.href));
        const isHovered = hoveredIndex === index;

        return (
          <Link
            key={item.href}
            href={item.href}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              'relative px-4 py-2 rounded-lg transition-all duration-200',
              'text-sm font-medium',
              isActive
                ? 'text-white'
                : 'text-slate-400 hover:text-white'
            )}
          >
            {/* Animated background on hover/active */}
            {(isActive || isHovered) && (
              <motion.div
                className={cn(
                  'absolute inset-0 rounded-lg',
                  isActive
                    ? 'bg-gradient-to-r from-accent-blue-500/20 via-accent-violet-500/20 to-accent-blue-500/20'
                    : 'bg-gradient-to-r from-accent-blue-500/10 via-accent-violet-500/10 to-accent-blue-500/10'
                )}
                layoutId="nav-bg"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              {item.label}
              {item.badge && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    'px-1.5 py-0.5 rounded-full text-[10px] font-bold',
                    isActive
                      ? 'bg-accent-blue-500 text-white'
                      : 'bg-slate-700 text-slate-300'
                  )}
                >
                  {item.badge}
                </motion.span>
              )}
            </span>

            {/* Active indicator line */}
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-blue-500 via-accent-violet-500 to-accent-blue-500 rounded-full"
                layoutId="active-indicator"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}

            {/* Hover glow effect */}
            {isHovered && !isActive && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-blue-500/0 via-accent-blue-500/10 to-accent-blue-500/0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

