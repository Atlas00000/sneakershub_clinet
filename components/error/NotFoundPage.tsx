'use client';

import { motion } from 'framer-motion';
import ErrorBackground from './ErrorBackground';
import ErrorContent from './ErrorContent';

interface NotFoundPageProps {
  /**
   * Custom error code
   */
  code?: string;
  
  /**
   * Custom title
   */
  title?: string;
  
  /**
   * Custom message
   */
  message?: string;
}

/**
 * 404 Not Found Page Component
 * Visually stunning error page with animations
 */
export default function NotFoundPage({
  code = '404',
  title = 'Page Not Found',
  message = "Looks like you've wandered off the path. The page you're looking for doesn't exist, but your next great design is waiting at home.",
}: NotFoundPageProps) {
  return (
    <div className="fixed inset-0 bg-charcoal-900 flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <ErrorBackground code={code} />

      {/* Error content */}
      <ErrorContent
        code={code}
        title={title}
        message={message}
        buttonText="Return to Design Studio"
        buttonHref="/"
      />
    </div>
  );
}

