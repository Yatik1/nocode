
import { Layers } from 'lucide-react';
import { ComponentLibrary } from './components/builder/ComponentLibrary';
import { Canvas } from './components/builder/Canvas';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Layers className="text-blue-500" size={32} />
          <h1 className="text-xl font-bold">Website Builder</h1>
        </div>
      </header>
      
      <main className="flex h-[calc(100vh-4rem)]">
        <ComponentLibrary />
        <Canvas />
      </main>
    </div>
  );
}

export default App;