import { X } from "lucide-react"
import { BuilderContextProps } from "../../context/BuilderContext"
import useBuilder from "../../hooks/useBuilder"
import ComponentRenderer from "../builder/ComponentRenderer"
import { useNavigate } from "react-router-dom"


function Preview() {
  const {page:selectedPage} = useBuilder() as BuilderContextProps

  console.log(selectedPage)


  return(
    <div className="w-full h-screen">
      <Navbar />
      <div>
        {selectedPage.content.map((content) => (
          <ComponentRenderer element={content} key={content.id} />
        ))}
      </div>
    </div>
  )
}

function Navbar() {

  const navigate=useNavigate()

  return (
<nav className="w-full h-10 flex items-center justify-between px-2 border-b border-gray-200 bg-white">
      <span className='w-9 h-9 flex items-center justify-center bg-white rounded-full'>
        <img src='logo.png' alt='logo' />
        </span>
         <p className='text-[0.856rem]'>Preview</p>
         <button
          className='flex items-center justify-center border border-gray-200 rounded-sm text-sm p-1 hover:bg-gray-200'
          onClick={() => navigate('/')}
        >
          <X className='w-3.5 h-3.5' />
        </button>
      </nav>
  )
}

export default Preview