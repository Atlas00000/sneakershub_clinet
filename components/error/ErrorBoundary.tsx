'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorFallback from './ErrorFallback';

interface ErrorBoundaryProps {
  /**
   * Children to render
   */
  children: ReactNode;
  
  /**
   * Fallback component to render on error
   * If not provided, uses default ErrorFallback
   */
  fallback?: (props: { error: Error; resetErrorBoundary: () => void }) => ReactNode;
  
  /**
   * Custom title for error message
   */
  title?: string;
  
  /**
   * Custom message for error message
   */
  message?: string;
  
  /**
   * Whether to show error details
   */
  showDetails?: boolean;
  
  /**
   * Custom icon/emoji for error display
   */
  icon?: ReactNode;
  
  /**
   * Callback when error is caught
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  
  /**
   * Callback when error boundary is reset
   */
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary Component
 * 
 * React Error Boundary that catches JavaScript errors in child components,
 * logs them, and displays a fallback UI instead of crashing the whole app.
 * 
 * @example
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * 
 * @example
 * <ErrorBoundary
 *   title="Failed to load 3D viewer"
 *   onError={(error, errorInfo) => logger.error('Viewer error', error)}
 * >
 *   <Scene />
 * </ErrorBoundary>
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call optional error callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // TODO: Log to error tracking service (e.g., Sentry) in production
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
  }

  handleReset = () => {
    // Reset error state
    this.setState({
      hasError: false,
      error: null,
    });

    // Call optional reset callback
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Render custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          resetErrorBoundary: this.handleReset,
        });
      }

      // Render default ErrorFallback
      return (
        <ErrorFallback
          error={this.state.error}
          resetErrorBoundary={this.handleReset}
          title={this.props.title}
          message={this.props.message}
          showDetails={this.props.showDetails}
          icon={this.props.icon}
        />
      );
    }

    return this.props.children;
  }
}

