'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Background {
  id: string;
  name: string;
  url: string;
  thumbnail: string | null;
  description: string;
}

interface BackgroundTooltipProps {
  background: Background;
  isVisible: boolean;
  position: { x: number; y: number };
  gradient: string;
}

/**
 * Background Tooltip - Shows background details on hover/select
 * Rendered via portal to avoid positioning issues
 */
export default function BackgroundTooltip({
  background,
  isVisible,
  position,
  gradient,
}: BackgroundTooltipProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: [0.0, 0, 0.2, 1] }}
          className="fixed z-[100] pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(-50%, -100%) translateY(-12px)',
          }}
        >
          <div className="glass-panel rounded-xl p-4 shadow-2xl border border-slate-700/50 min-w-[200px] max-w-[280px]">
            {/* Gradient preview */}
            <div
              className="w-full h-24 rounded-lg mb-3 border border-slate-700/50 shadow-inner"
              style={{ background: gradient }}
            />
            
            {/* Background info */}
            <div className="space-y-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white text-body-m line-clamp-1 mb-1">
                  {background.name}
                </h4>
                {background.description && (
                  <p className="text-body-s text-slate-400 line-clamp-2">
                    {background.description}
                  </p>
                )}
              </div>
            </div>

            {/* Arrow pointer */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
              <div className="w-3 h-3 bg-slate-800 border-r border-b border-slate-700/50 rotate-45" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(tooltipContent, document.body);
}

