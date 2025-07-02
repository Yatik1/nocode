
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
  const {selectedElement, sections} = useBuilder() as BuilderContextProps 
  return (
    <div className='flex flex-col w-full '>
      <Navbar />  
      <div className="relative h-full bg-[url('/paper.svg')] flex items-center justify-center">      
      <main className='flex p-2'>
        <ComponentLibrary />
        <BuildLayer>
            {sections.map((element:CanvasType) => (
              <ComponentRenderer key={element.id} element={element} />
            ))}
        </BuildLayer>
      </main>
      {selectedElement && (
          <Properties />
        )}
    </div>
   </div>
  )
}

function BuildLayer({children}:{children:React.ReactNode}) {
  return (
    <section className='flex flex-col gap-2'>
         {children}
    </section>
  )
}

export default App;