'use client';

import { useRouter } from 'next/navigation';
import { useConfiguratorStore } from '../../stores/configuratorStore';
import { Card } from '@/components/ui';
import { motion } from 'framer-motion';

export default function ModeSelector() {
  const router = useRouter();
  const { setMode } = useConfiguratorStore();

  const handleModeSelect = (mode: 'blank' | 'branded') => {
    setMode(mode);
    router.push(`/configurator/${mode}`);
  };

  const modes = [
    {
      id: 'blank',
      icon: '🎨',
      title: 'Blank Canvas',
      description: 'Start from scratch with full creative freedom',
      gradient: 'from-accent-blue-500 to-accent-violet-500',
    },
    {
      id: 'branded',
      icon: '🏷️',
      title: 'Brand Collection',
      description: 'Customize real-world branded sneaker models',
      gradient: 'from-accent-violet-500 to-accent-blue-500',
    },
  ] as const;

  return (
    <div className="flex flex-col sm:flex-row gap-6">
      {modes.map((mode, index) => (
        <motion.div
          key={mode.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="flex-1"
        >
          <Card
            hoverable
            padding="lg"
            variant="elevated"
            className="h-full cursor-pointer border-2 border-slate-700/50 hover:border-accent-blue-500/50"
            onClick={() => handleModeSelect(mode.id as 'blank' | 'branded')}
          >
            <div className="text-center">
              {/* Icon with gradient background */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`
                  w-20 h-20 mx-auto mb-6 
                  bg-gradient-to-br ${mode.gradient}
                  rounded-2xl 
                  flex items-center justify-center
                  text-4xl
                  shadow-lg
                `}
              >
                {mode.icon}
              </motion.div>
              
              <h2 className="text-heading-l font-bold text-white mb-3">
                {mode.title}
              </h2>
              <p className="text-body-m text-slate-400">
                {mode.description}
              </p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

