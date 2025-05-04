import { Save, ScanEye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function Navbar() {

    const navigate = useNavigate()

  return (
    <div className="w-full h-[6.5vh] border-b border-gray-200 flex justify-between items-center align-center px-3 gap-1">
        <span className='w-12 h-12 flex items-center justify-center'>
            <img src='logo.png' alt='logo' />
        </span>
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