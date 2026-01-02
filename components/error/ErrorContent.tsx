'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ErrorContentProps {
  /**
   * Error code
   */
  code?: string;
  
  /**
   * Error title
   */
  title?: string;
  
  /**
   * Error message
   */
  message?: string;
  
  /**
   * Button text
   */
  buttonText?: string;
  
  /**
   * Button link
   */
  buttonHref?: string;
}

/**
 * Error Content Component
 * Displays error code, message, and action button
 */
export default function ErrorContent({
  code = '404',
  title = 'Page Not Found',
  message = "Looks like you've wandered off the path. The page you're looking for doesn't exist.",
  buttonText = 'Return Home',
  buttonHref = '/',
}: ErrorContentProps) {
  const codeArray = code.split('');

  return (
    <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-2xl">
      {/* Animated error code */}
      <div className="flex items-center gap-2">
        {codeArray.map((digit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -50, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.6,
              ease: [0.0, 0, 0.2, 1],
            }}
            className="relative"
          >
            <motion.div
              className="text-9xl font-bold bg-gradient-to-br from-accent-blue-400 via-accent-violet-400 to-accent-blue-600 bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
            >
              {digit}
            </motion.div>
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-accent-blue-500/30 via-accent-violet-500/30 to-accent-blue-500/30 blur-2xl -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-heading-l font-bold text-white"
      >
        {title}
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-body-l text-slate-300 leading-relaxed"
      >
        {message}
      </motion.p>

      {/* Action button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Link href={buttonHref}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-4 rounded-xl bg-gradient-to-r from-accent-blue-500 via-accent-violet-500 to-accent-blue-600 text-white font-semibold text-body-m shadow-xl shadow-accent-blue-500/30 overflow-hidden group"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            <span className="relative z-10 flex items-center gap-2">
              {buttonText}
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

