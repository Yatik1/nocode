
// import { Layers } from 'lucide-react';
import ComponentLibrary from './components/builder/ComponentLibrary';
import Canvas from './components/builder/Canvas';

function App() {
  return (
    <div className="min-h-screen h-auto bg-gray-50">
      
      <main className="flex flex-row h-[calc(100vh-4rem)]">
        <ComponentLibrary />
        <Canvas />
      </main>
    </div>
  );
}

export default App;