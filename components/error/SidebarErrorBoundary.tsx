'use client';

import React from 'react';
import ErrorBoundary from './ErrorBoundary';

interface SidebarErrorBoundaryProps {
  /**
   * Children to render (typically sidebar content)
   */
  children: React.ReactNode;
  
  /**
   * Callback when error is caught
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * SidebarErrorBoundary Component
 * 
 * Specialized error boundary for the sidebar/control panel.
 * Provides a compact error message that fits within the sidebar layout.
 * 
 * @example
 * <SidebarErrorBoundary>
 *   <MaterialLibrary />
 *   <ModelSelector />
 * </SidebarErrorBoundary>
 */
export default function SidebarErrorBoundary({
  children,
  onError,
}: SidebarErrorBoundaryProps) {
  return (
    <ErrorBoundary
      title="Component Error"
      message="There was an error loading this section. Please refresh the page."
      icon="⚠️"
      showDetails={process.env.NODE_ENV === 'development'}
      onError={onError}
      fallback={({ error, resetErrorBoundary }) => (
        <div className="p-6 space-y-4">
          <div className="text-center space-y-2">
            <div className="text-4xl">⚠️</div>
            <h3 className="text-heading-m font-semibold text-white">
              Component Error
            </h3>
            <p className="text-body-s text-slate-400">
              There was an error loading this section.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={resetErrorBoundary}
              className="px-4 py-2 bg-accent-blue-500 hover:bg-accent-blue-600 text-white rounded-lg transition-colors text-body-s font-medium"
            >
              Try Again
            </button>
            {process.env.NODE_ENV === 'development' && error && (
              <details className="mt-2">
                <summary className="text-body-xs text-slate-500 cursor-pointer">
                  Error details
                </summary>
                <pre className="mt-2 text-body-xs font-mono text-red-400 bg-slate-900/50 p-2 rounded overflow-auto max-h-32">
                  {error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

