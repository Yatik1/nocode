import React, { useEffect, useRef, useState } from 'react';
import Card from '../ui/Card';
import { Type, Image, Link, Heading, SeparatorHorizontal, AlignHorizontalDistributeCenter, AlignVerticalDistributeCenter, SquareDashed, Plus, Home, File, PanelLeftClose } from 'lucide-react';
import useBuilder from '../../hooks/useBuilder';
import { BuilderContextProps } from '../../context/BuilderContext';
import { CanvasType, PageType } from '../../types/types';
import { getDefaultProps } from '../../utils/getProps';
import gsap from 'gsap';

const components = [
  { id: 'container', icon: <SquareDashed size={24} />, label: 'Container' },
  { id: 'heading', icon: <Heading size={24} />, label: 'Heading' },
  { id: 'text', icon: <Type size={24} />, label: 'Text' },
  { id: 'image', icon: <Image size={24} />, label: 'Image' },
  { id: 'button', icon: <Link size={24} />, label: 'Button' },
  {id:'divider', icon: <SeparatorHorizontal />, label:'Separator'},
];

const layouts = [
  { id: 'row', icon: <AlignHorizontalDistributeCenter size={24} />, label: 'Row' },
  { id: 'column', icon: <AlignVerticalDistributeCenter size={24} />, label: 'Column' },
]


function ComponentLibrary() {

  const {open} = useBuilder() as BuilderContextProps
  const [selectedOption, setSelectedOption] = useState("assets")

  const sideRef = useRef(null)

  useEffect(() => {
    if(open){
      gsap.fromTo(
      sideRef.current,
      { x: -300 },
      { 
        x:0,
        ease:'circ.out'
       }
    );
    }
  },[open]);

  function sideClose() {
    gsap.to(
      sideRef.current, {
        x:-300
      }
    )
  }

  function onClose() {
    sideClose()
  }


  return (
    open && (
      <div ref={sideRef} className="fixed z-10 top-0 left-0 border-0 bg-white h-full w-[16rem] border-r border-gray-200 p-4">
      <div className='flex items-center justify-between mb-4'>
        <div className="w-fit h-10 bg-gray-100 border border-gray-300 rounded-md flex gap-2 items-center justify-between p-1 tracking-tighter text-sm">
            <p className={`px-2 py-1 ${selectedOption === "pages" ? "bg-white" : "" }  rounded-md`} onClick={() => setSelectedOption("pages")}>Pages</p>
            <p className={`px-2 py-1 ${selectedOption === "assets" ? "bg-white" : "" } rounded-md`} onClick={() => setSelectedOption("assets")}>Assets</p>
        </div>

        <button className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer" onClick={onClose}>
          <PanelLeftClose size={22} />
        </button>
      </div>

      {selectedOption === "assets" &&  <Assets />}
      {selectedOption === "pages" &&  <PagesSelection />}
      

    </div>
    ) 
  );
}


function Assets() {

  const {setSelectedElement} = useBuilder() as BuilderContextProps

  const onDragStart = (e: React.DragEvent, componentId: string) => {
    setSelectedElement(null)
      e.dataTransfer.setData('componentId', componentId);
    };

    
  return (
    <>
      <h2 className="text-lg font-semibold">Components</h2>
      <div className="grid grid-cols-2 gap-2">
        
        {components.map((component) => (
          <Card
            key={component.id}
            draggable
            onDragStart={(e) => onDragStart(e, component.id)}
            className="p-3 cursor-move hover:bg-gray-50 transition-colors flex flex-col items-center gap-2"
          >
            {component.icon}
            <span className="text-[0.85rem]">{component.label}</span>
          </Card>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-2 mt-5">Layouts</h2>
      <div className="grid grid-cols-2 gap-2">
        {layouts.map((layout) => (
          <Card
            key={layout.id}
            draggable
            onDragStart={(e) => onDragStart(e, layout.id)}
            className="px-1 py-3 cursor-move hover:bg-gray-50 transition-colors flex flex-col items-center gap-2"
          >
            {layout.icon}
            <span className="text-[0.8rem]">{layout.label}</span>
          </Card>
        ))}
      </div>

    </>
  )
}

function PagesSelection() {
  const {pages, page:selectedPage, setPages, setPage} = useBuilder() as BuilderContextProps
  
    function addPage() {

      const nextPageNumber = pages.length > 0 ? Math.max(...pages.map(p => p.pageNumber)) + 1 : 1;

      const newSection: CanvasType = {
        id: `canvas-${Date.now()}`,
        type:"canvas",
        props: getDefaultProps('canvas'),
        childrens:[]
    }
  
      const newPage = {
        id:`page-${Date.now()}`,
        pageNumber:nextPageNumber,
        pageName:"New page",
        content:[newSection]
      }
  
      setPages((prev: PageType[]) => [...prev, newPage]);
    }
  
    function selectPage(page:PageType) {
      setPage({
        id:page.id,
        pageNumber:page.pageNumber,
        pageName:page.pageName,
        content:page.content
      })
    }
  
    return(
      <>
        <span className='flex items-center justify-between text-sm'>
          Pages 

          <button className='flex items-center justify-center hover:bg-gray-200 p-1 rounded-md' onClick={addPage}>
             <Plus size={15} /> 
          </button>
        </span>
        <hr className='mt-1.5 text-gray-300'/>
          <div className='bg-white mt-3'>
            {pages.length > 0 && pages.map((page) =>(
                <span 
                  key={page.id} 
                  className={` w-full flex flex-col items-start justify-center p-1.5 cursor-pointer hover:bg-gray-200 rounded-sm my-0.5 tracking-tighter ${page.id === selectedPage.id ? "bg-gray-200 " : ""}`} 
                  onClick={() => selectPage(page)}
                > 
                  <p className="pl-6 flex items-center justify-center gap-1 text-sm">
                    {page.pageName === "Home" ? (
                      <>
                        <Home fill='black' size={13} /> {page.pageName}
                      </>
                    ) : (
                      <>
                        <File size={13} />
                        {page.pageName} - {page.pageNumber}
                      </>
                    )}
                  </p>
                </span>
              ))}
          </div>
      </>
    )
}


export default ComponentLibrary