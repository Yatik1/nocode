
import ComponentLibrary from './components/builder/ComponentLibrary';
import Canvas from './components/builder/Canvas';
import useBuilder from './hooks/useBuilder';
import Properties from './components/builder/Properties';
import Navbar from './components/ui/Navbar';
import { Route, Routes } from 'react-router-dom';
import Preview from './components/page/Preview';

function App() {

  return (
   <Routes>
     <Route path='/' element={<AppLayer />} />
     <Route path="/preview" element={<Preview />} />
   </Routes>
  );
}

function AppLayer() {
  const {selectedElement} = useBuilder() as any 
  return (
    <div className='flex-1 flex-col'>
      <Navbar />
     <div className="relative w-screen h-fit bg-gray-50">
      <main className="flex flex-row w-full">
        <ComponentLibrary />
        <Canvas />
        {selectedElement && (
          <Properties />
        )}
      </main>
      
    </div>
   </div>
  )
}

export default App;