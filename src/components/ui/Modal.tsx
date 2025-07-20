import { useState } from 'react';
import { BuilderContextProps } from '../../context/BuilderContext';
import useBuilder from '../../hooks/useBuilder';
import { CanvasType, PageType } from '../../types/types';
import { getDefaultProps } from '../../utils/getProps';
import { ChevronDown, Plus } from 'lucide-react';

export default function Modal() {
    const {pages, page:selectedPage, setPages, setPage} = useBuilder() as BuilderContextProps
    const [openPageModal, setPageModal] = useState<boolean>(false)
  
    function addPage() {
      const newSection: CanvasType = {
        id: `canvas-${Date.now()}`,
        type:"canvas",
        props: getDefaultProps('canvas'),
        childrens:[]
    }
  
      const newPage = {
        id:`page-${Date.now()}`,
        pageName:"New page",
        content:[newSection]
      }
  
      setPages((prev: PageType[]) => [...prev, newPage]);
    }
  
    function selectPage(page:PageType) {
      setPage({
        id:page.id,
        pageName:page.pageName,
        content:page.content
      })
      setPageModal(false)
    }
  
    return(
      <>
      <span className="text-sm border border-blue-600 px-2 py-1 rounded-md bg-blue-300 text-blue-600 flex items-center justify-between gap-2 relative cursor-pointer" onClick={() => setPageModal(prev=> !prev)}>{selectedPage.pageName} <ChevronDown size={16} /> </span>
          {openPageModal && <div className='bg-white w-fit h-fit absolute z-[9999] top-[3rem] rounded-md border border-gray-300 p-1'>
            {pages.length > 0 && pages.map((page) =>(
                <p 
                  key={page.id} 
                  className={`text-sm w-full flex flex-col items-start justify-center p-1 cursor-pointer hover:bg-gray-200 ${page.id === selectedPage.id ? "bg-gray-200 rounded-sm" : ""}`} 
                  onClick={() => selectPage(page)}
                > 
                  {page.pageName}
                </p>
              ))}
              <button className='flex items-center justify-center text-sm gap-1 bg-gray-200 text-gray-600 rounded-sm mt-1 px-1 py-0.5' onClick={addPage}>
                <Plus size={15} />
                New page
              </button>
          </div>}
      </>
    )
  }