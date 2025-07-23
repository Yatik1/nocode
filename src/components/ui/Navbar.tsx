import { PanelLeftOpen, Save, ScanEye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import useBuilder from '../../hooks/useBuilder'
import { BuilderContextProps } from '../../context/BuilderContext'

function Navbar() {

    const navigate = useNavigate()
    const {setOpen, setSelectedElement} = useBuilder() as BuilderContextProps

  return (
    <div className="sticky top-0 z-10 bg-white w-full h-[6.5vh] border-b border-gray-200 flex justify-between items-center align-center px-3 gap-1">
        <button className='flex items-center justify-center cursor-pointer' onClick={() => {setOpen(true); setSelectedElement(null)}}>
          <PanelLeftOpen stroke="#646464" size={22} />
        </button>
        {/* <span className='w-[9rem] flex items-center justify-start'>

        </span> */}
        <div className='flex items-center justify-center gap-3 w-full'>
            <div className='bg-black w-20 rounded-md h-8 text-white flex items-center justify-center gap-2'>
                <p className='text-white text-sm'>Save</p>
                <Save size={15}/>
            </div>
            <div className='bg-white border border-gray-300 w-25 rounded-md h-8 text-black flex items-center justify-center gap-2' onClick={() => navigate("/preview")}>
                <p className='text-sm'>Preview</p>
                <ScanEye size={15}/>
            </div>
        </div>
        <div className='flex bg-black text-white rounded-md h-8 w-20 items-center justify-center text-sm' onClick={() => toast.message("Published", {description:"Website has been published successfully"})}>
            Publish
        </div>
    </div>
  )
}

export default Navbar