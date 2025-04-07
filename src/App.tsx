
// import { Layers } from 'lucide-react';
import ComponentLibrary from './components/builder/ComponentLibrary';
import Canvas from './components/builder/Canvas';
import useBuilder from './hooks/useBuilder';

function App() {

  const {elements} = useBuilder() as any 

  return (
    <div className="min-h-screen h-auto bg-gray-50">
      
      <main className="flex flex-row h-[calc(100vh-4rem)]">
        <ComponentLibrary />
        <Canvas />
      </main>
      <button onClick={() => console.log(elements)}>Get data json</button>
    </div>
  );
}

export default App;