'use client';

import { ReactNode } from 'react';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';

interface ConfiguratorLayoutProps {
  /**
   * Main content area (typically the 3D viewer)
   */
  children: ReactNode;
  
  /**
   * Sidebar content (controls, selectors, etc.)
   */
  sidebarContent: ReactNode;
  
  /**
   * Top bar title
   */
  title?: string;
  
  /**
   * Whether to show the back button in top bar
   */
  showBackButton?: boolean;
  
  /**
   * Custom back link URL
   */
  backHref?: string;
  
  /**
   * Additional content in the top bar right section
   */
  topBarRightContent?: ReactNode;
  
  /**
   * Sidebar width (default: 360px)
   */
  sidebarWidth?: string;
}

/**
 * ConfiguratorLayout Component - Main layout wrapper for configurator pages
 * 
 * Responsive wrapper that switches between:
 * - DesktopLayout: Fixed sidebar on desktop
 * - MobileLayout: Bottom drawer sidebar on mobile
 * 
 * Provides:
 * - TopBar with navigation
 * - Main content area (flex-1)
 * - Responsive sidebar behavior
 * - Proper spacing and layout structure
 */
export default function ConfiguratorLayout({
  children,
  sidebarContent,
  title,
  showBackButton = false,
  backHref = '/',
  topBarRightContent,
  sidebarWidth = '360px',
}: ConfiguratorLayoutProps) {
  const commonProps = {
    title,
    showBackButton,
    backHref,
    topBarRightContent,
    sidebarContent,
  };

  return (
    <>
      {/* Desktop Layout */}
      <DesktopLayout
        {...commonProps}
        sidebarWidth={sidebarWidth}
      >
        {children}
      </DesktopLayout>

      {/* Mobile Layout */}
      <MobileLayout {...commonProps}>
        {children}
      </MobileLayout>
    </>
  );
}

