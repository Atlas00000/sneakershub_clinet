'use client';

import { ReactNode, useState } from 'react';
import TopBar from './TopBar';
import MobileSidebar from './MobileSidebar';
import { useMobile } from '@/hooks/useMediaQuery';
import SidebarErrorBoundary from '@/components/error/SidebarErrorBoundary';

interface MobileLayoutProps {
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
}

/**
 * Mobile Layout Component
 * 
 * Optimized layout for mobile devices with:
 * - Full-screen content area
 * - Bottom drawer sidebar (slide up from bottom)
 * - Floating action button to open sidebar
 * - Touch-friendly interactions
 * - Optimized spacing and sizing
 */
export default function MobileLayout({
  children,
  sidebarContent,
  title,
  showBackButton = false,
  backHref = '/',
  topBarRightContent,
}: MobileLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMobile();

  // Only render if actually on mobile
  if (!isMobile) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-charcoal-900 overflow-hidden">
      {/* Top Bar */}
      <TopBar
        showBackButton={showBackButton}
        backHref={backHref}
        rightContent={topBarRightContent}
      />

      {/* Main Content Area - Adjusts height based on sidebar state */}
      <main
        className="relative overflow-hidden transition-all duration-300 ease-out"
        style={{
          height: isSidebarOpen ? 'calc(50vh - 4rem)' : 'calc(100vh - 4rem)',
        }}
      >
        {children}
      </main>

      {/* Mobile Sidebar Panel - Bottom Half */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        title="Configuration"
      >
        <SidebarErrorBoundary>
          {sidebarContent}
        </SidebarErrorBoundary>
      </MobileSidebar>

      {/* Floating Action Button - Toggle Sidebar */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed right-6 w-14 h-14 bg-gradient-to-r from-accent-blue-500 via-accent-violet-500 to-accent-blue-600 rounded-full shadow-2xl hover:shadow-accent-blue-500/50 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center text-white z-50 touch-manipulation ${
          isSidebarOpen ? 'bottom-[calc(50%+0.75rem)]' : 'bottom-6'
        }`}
        aria-label={isSidebarOpen ? 'Close configuration' : 'Open configuration'}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isSidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          )}
        </svg>
      </button>
    </div>
  );
}

