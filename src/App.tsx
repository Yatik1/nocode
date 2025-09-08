
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
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="relative min-h-full max-h-full bg-gray-50 flex items-center justify-center">
        <main className="flex p-2">
          <ComponentLibrary />
          <BuildLayer>
            {page && page.content.length > 0 && page.content.map((canvas: CanvasType) => (
              <ComponentRenderer key={canvas.id} element={canvas} />
            ))}
          </BuildLayer>
        </main>
        {selectedElement && <Properties />}
      </div>
    </div>
  );
}

function BuildLayer({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      {children}
    </section>
  );
}

export default App;