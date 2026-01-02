'use client';

import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import ErrorFallback from './ErrorFallback';

interface ViewportErrorBoundaryProps {
  /**
   * Children to render (typically the 3D viewport)
   */
  children: React.ReactNode;
  
  /**
   * Callback when error is caught
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * ViewportErrorBoundary Component
 * 
 * Specialized error boundary for the 3D viewport/Scene.
 * Provides a context-specific error message and fallback UI.
 * 
 * @example
 * <ViewportErrorBoundary>
 *   <Scene>
 *     <ModelLoader />
 *   </Scene>
 * </ViewportErrorBoundary>
 */
export default function ViewportErrorBoundary({
  children,
  onError,
}: ViewportErrorBoundaryProps) {
  return (
    <ErrorBoundary
      title="Failed to load 3D viewer"
      message="There was an error loading the 3D scene. This might be due to a WebGL compatibility issue or a problem with the model file."
      icon="🎨"
      showDetails={process.env.NODE_ENV === 'development'}
      onError={onError}
    >
      {children}
    </ErrorBoundary>
  );
}

