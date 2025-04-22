
// import { Layers } from 'lucide-react';
import ComponentLibrary from './components/builder/ComponentLibrary';
import Canvas from './components/builder/Canvas';
import useBuilder from './hooks/useBuilder';
import Properties from './components/builder/Properties';
import Navbar from './components/ui/Navbar';

function App() {

  const {elements,selectedElement} = useBuilder() as any 

  return (
   <div className='relative flex-1 flex-col'>
      <Navbar />
     <div className="relative min-h-screen h-auto bg-gray-50">
      
      <main className="flex flex-row h-[calc(100vh-4rem)]">
        <ComponentLibrary />
        <Canvas />
        {selectedElement && (
          <Properties />
        )}
      </main>
      <button onClick={() => console.log(JSON.stringify(elements))}>Get data stringify</button>
      <button onClick={() => console.log(elements)}>Get data json</button>
    </div>
   </div>
  );
}

export default App;