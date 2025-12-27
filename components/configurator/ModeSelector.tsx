'use client';

import { useRouter } from 'next/navigation';
import { useConfiguratorStore } from '../../stores/configuratorStore';

export default function ModeSelector() {
  const router = useRouter();
  const { setMode } = useConfiguratorStore();

  const handleModeSelect = (mode: 'blank' | 'branded') => {
    setMode(mode);
    router.push(`/configurator/${mode}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <button
        onClick={() => handleModeSelect('blank')}
        className="flex-1 px-8 py-12 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-500"
      >
        <div className="text-center">
          <div className="text-3xl mb-3">🎨</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Blank Canvas</h2>
          <p className="text-gray-600">Start from scratch with full creative freedom</p>
        </div>
      </button>
      <button
        onClick={() => handleModeSelect('branded')}
        className="flex-1 px-8 py-12 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-500"
      >
        <div className="text-center">
          <div className="text-3xl mb-3">🏷️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Brand Collection</h2>
          <p className="text-gray-600">Customize real-world branded sneaker models</p>
        </div>
      </button>
    </div>
  );
}

