'use client';

import { useConfiguratorStore } from '@/stores/configuratorStore';
import backgroundsData from '@/data/backgrounds.json';

interface Background {
  id: string;
  name: string;
  url: string;
  thumbnail: string | null;
  description: string;
}

/**
 * Background selector UI - allows users to select HDR background environments
 */
export default function BackgroundSelector() {
  const { selectedBackgroundUrl, setBackground } = useConfiguratorStore();
  const backgrounds = backgroundsData.backgrounds as Background[];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Background</h3>
      <div className="space-y-2">
        {backgrounds.map((background) => {
          const isSelected = selectedBackgroundUrl === background.url;

          return (
            <button
              key={background.id}
              onClick={() => setBackground(background.url)}
              className={`
                w-full text-left p-3 rounded-lg font-medium transition-all duration-200
                ${isSelected
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{background.name}</div>
                  {background.description && (
                    <div className={`text-xs mt-1 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                      {background.description}
                    </div>
                  )}
                </div>
                {isSelected && (
                  <span className="text-xl">✓</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {selectedBackgroundUrl && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            Background selected
          </p>
        </div>
      )}
    </div>
  );
}

