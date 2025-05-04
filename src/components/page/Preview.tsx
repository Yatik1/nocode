import { useNavigate } from 'react-router-dom'
import useBuilder from '../../hooks/useBuilder'
import { X } from 'lucide-react'
import { ElementType } from '../builder/Canvas'
import ComponentRenderer from '../builder/ComponentRenderer'

function Preview() {
    
    const {elements} = useBuilder() as any
    const navigate = useNavigate()
    console.log(elements)


  return (

    <div className='w-full h-screen m-0 p-0'>
    <header className='bg-white items-center justify-between flex w-full p-[0.4rem] border border-b border-gray-200'>
      <span className='w-9 h-9 flex items-center justify-center bg-white rounded-full'>
        <img src='logo.png' alt='logo' />
      </span>
      <p className='text-[0.856rem]'>Preview</p>
      <button className="flex items-center justify-center border border-gray-400 rounded-lg text-sm p-1" onClick={() => navigate("/")}>
        <X className='w-4 h-4' />
      </button>
    </header>
    <div className='bg-white flex flex-col w-full h-screen'>
    {elements.map((element: ElementType) => (
    <div
      key={element.id}
    >
      <ComponentRenderer element={element} />
    </div>
  ))}
    </div>
    </div>
  )
}

export default Preview