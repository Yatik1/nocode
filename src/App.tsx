
import ComponentLibrary from './components/builder/ComponentLibrary';
import useBuilder from './hooks/useBuilder';
import Properties from './components/builder/Properties';
import { Route, Routes } from 'react-router-dom';
import Preview from './components/page/Preview';
import ComponentRenderer from './components/builder/ComponentRenderer';
import { BuilderContextProps } from './context/BuilderContext';
import { CanvasType, PageType } from './types/types';
import { PanelLeftOpen } from 'lucide-react';
import ControlPanel from './components/ui/ControlPanel';
import InfiniteCanvas from './components/ui/InfiniteCanvas';
import Website from './components/page/Website';

function App() {

  return (
   <Routes>
     <Route path='/' element={<AppLayout />} />
     <Route path="/preview" element={<Preview />} />
     <Route path='/:projectId' element={<Website />}/>
     {/* <Route path='/infinite' element={<InfiniteCanvas />}  */}
   </Routes>
  );
}

function AppLayout() {
  const { setPage,pages, selectedElement,setOpen, setSelectedElement} = useBuilder() as BuilderContextProps;

  function onOpen() {
      setOpen((prev:boolean) => !prev)
      setSelectedElement(null)
    }

    const selectPage = (page:PageType) => {
        setPage({
          id:page.id,
          pageNumber:page.pageNumber,
          pageName:page.pageName,
          content:page.content
        })
      }

  return (
      <div className="relative bg-[#f5f5f5] min-h-[100vh] h-fit flex items-center justify-center">
        
        <button className='fixed top-1 left-2 flex items-center justify-center cursor-pointer p-1 bg-white rounded-md' onClick={onOpen}>
          <PanelLeftOpen stroke="#646464" size={20} />
        </button>

        <ComponentLibrary />

        <main className="flex">
          
          <InfiniteCanvas>
            <div className="flex items-start justify-start gap-10">
              {pages && pages.map((page:PageType) => {
              return (
                <div className='flex flex-col gap-2 items-start justify-start' onClick={() => selectPage(page)}>
                  <p className="text-xs text-blue-500">/{page.pageName}</p>
                  {page.content.map((canvas:CanvasType) => (
                    <ComponentRenderer key={canvas.id} element={canvas}/>
                  ))}
                </div>
              )
            })}
            </div>
          </InfiniteCanvas>
        </main>
        {selectedElement && <Properties />}
      <ControlPanel />
      </div>
  );
}


export default App;