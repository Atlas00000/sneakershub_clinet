'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import AnimatedBackground from './AnimatedBackground';
import AnimatedLogo from './AnimatedLogo';
import ProgressIndicator from './ProgressIndicator';

interface LoadingScreenProps {
  /**
   * Progress value (0-100)
   */
  progress?: number;
  
  /**
   * Loading message
   */
  message?: string;
  
  /**
   * Whether to show the loading screen
   */
  show?: boolean;
  
  /**
   * Custom loading messages array (will cycle through)
   */
  messages?: string[];
}

/**
 * Full-Screen Loading Screen Component
 * Visually stunning, interactive loading experience
 */
export default function LoadingScreen({
  progress,
  message = 'Loading your experience...',
  show = true,
  messages = [
    'Preparing your canvas...',
    'Loading premium materials...',
    'Setting up the studio...',
    'Almost ready...',
  ],
}: LoadingScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(message);

  // Cycle through messages if array provided
  useEffect(() => {
    if (messages.length > 1 && !message) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [messages, message]);

  useEffect(() => {
    if (messages.length > 1 && !message) {
      setDisplayMessage(messages[currentMessageIndex]);
    } else {
      setDisplayMessage(message);
    }
  }, [currentMessageIndex, messages, message]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-charcoal-900 flex items-center justify-center overflow-hidden"
        >
          {/* Animated background */}
          <AnimatedBackground variant="loading" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-12 px-6">
            {/* Animated logo */}
            <AnimatedLogo size="lg" />

            {/* Progress indicator */}
            <ProgressIndicator
              progress={progress}
              animated={progress === undefined}
              message={displayMessage}
            />

            {/* Decorative dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-accent-blue-500 to-accent-violet-500"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

