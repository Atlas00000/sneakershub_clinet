'use client';

import { ReactNode } from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { useMobile } from '@/hooks/useMediaQuery';
import SidebarErrorBoundary from '@/components/error/SidebarErrorBoundary';

interface DesktopLayoutProps {
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
 * Desktop Layout Component
 * 
 * Optimized layout for desktop devices with:
 * - Fixed sidebar on the right
 * - Flexible main content area
 * - Traditional desktop UX patterns
 */
export default function DesktopLayout({
  children,
  sidebarContent,
  title,
  showBackButton = false,
  backHref = '/',
  topBarRightContent,
  sidebarWidth = '360px',
}: DesktopLayoutProps) {
  const isMobile = useMobile();

  // Only render if actually on desktop
  if (isMobile) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-charcoal-900">
      {/* Top Bar */}
      <TopBar
        showBackButton={showBackButton}
        backHref={backHref}
        rightContent={topBarRightContent}
      />

      {/* Main Layout */}
      <div className="flex-1 flex relative">
        {/* Main Content Area */}
        <main
          className="flex-1 relative"
          style={{
            marginRight: sidebarWidth,
          }}
        >
          {children}
        </main>

        {/* Sidebar - Fixed on Right */}
        <Sidebar
          isOpen={true}
          onClose={() => {}}
          width={sidebarWidth}
          isMobile={false}
        >
          <SidebarErrorBoundary>
            {sidebarContent}
          </SidebarErrorBoundary>
        </Sidebar>
      </div>
    </div>
  );
}

