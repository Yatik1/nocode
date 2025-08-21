
import ComponentLibrary from './components/builder/ComponentLibrary';
import useBuilder from './hooks/useBuilder';
import Properties from './components/builder/Properties';
import Navbar from './components/ui/Navbar';
import { Route, Routes } from 'react-router-dom';
import Preview from './components/page/Preview';
import ComponentRenderer from './components/builder/ComponentRenderer';
import { BuilderContextProps } from './context/BuilderContext';
import { CanvasType } from './types/types';

function App() {

  return (
   <Routes>
     <Route path='/' element={<AppLayout />} />
     <Route path="/preview" element={<Preview />} />
   </Routes>
  );
}

function AppLayout() {
  const { selectedElement, page } = useBuilder() as BuilderContextProps;

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Top Navbar */}

        <Navbar />


      {/* Body: Sidebar + Canvas + Properties */}
      <div className="flex flex-1 overflow-hidden bg-gray-100">
        {/* Left Sidebar - Component Library */}
        
          <ComponentLibrary />
   
        {/* Center Canvas Area */}
        <main className="flex-1 relative overflow-auto bg-neutral-100 p-4">
          <div className="relative mx-0 w-fit h-fit bg-white shadow rounded-md">
            {page && page.content.length > 0 && page.content.map((canvas: CanvasType) => (
              <ComponentRenderer key={canvas.id} element={canvas} />
            ))}
          </div>
        </main>

        {/* Right Sidebar - Properties */}
        {selectedElement && (
          <aside className="w-[320px] min-w-[290px] max-w-[350px] h-full overflow-y-auto">
            <Properties />
          </aside>
        )}
      </div>
    </div>
  );
}


export default App;