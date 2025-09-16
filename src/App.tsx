
import ComponentLibrary from './components/builder/ComponentLibrary';
import useBuilder from './hooks/useBuilder';
import Properties from './components/builder/Properties';
import { Route, Routes } from 'react-router-dom';
import Preview from './components/page/Preview';
import ComponentRenderer from './components/builder/ComponentRenderer';
import { BuilderContextProps } from './context/BuilderContext';
import { CanvasType } from './types/types';
import { PanelLeftOpen } from 'lucide-react';
import ControlPanel from './components/ui/ControlPanel';
import InfiniteCanvas from './components/ui/InfiniteCanvas';

function App() {

  return (
   <Routes>
     <Route path='/' element={<AppLayout />} />
     <Route path="/preview" element={<Preview />} />
     {/* <Route path='/infinite' element={<InfiniteCanvas />}  */}
   </Routes>
  );
}

function AppLayout() {
  const { selectedElement, page,setOpen, setSelectedElement} = useBuilder() as BuilderContextProps;

  function onOpen() {
      setOpen((prev:boolean) => !prev)
      setSelectedElement(null)
    }

  return (
      <div className="relative bg-[#f5f5f5] min-h-[100vh] h-fit flex items-center justify-center">
        
        <button className='absolute top-1 left-2 flex items-center justify-center cursor-pointer p-1 bg-white rounded-md' onClick={onOpen}>
          <PanelLeftOpen stroke="#646464" size={20} />
        </button>

        <ComponentLibrary />

        <main className="flex">
          
          <InfiniteCanvas>
            <p className="text-xs text-blue-500">/{page.pageName}</p>
            {page && page.content.length > 0 && page.content.map((canvas: CanvasType) => (
              <ComponentRenderer key={canvas.id} element={canvas} />
            ))}
          </InfiniteCanvas>
        </main>
        <Properties />
      <ControlPanel />
      </div>
  );
}


export default App;