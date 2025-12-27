import ModeSelector from '@/components/configurator/ModeSelector';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-2xl px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Fashion Configurator</h1>
          <p className="text-xl text-gray-600">Choose your customization mode</p>
        </div>
        <ModeSelector />
      </div>
    </main>
  );
}

