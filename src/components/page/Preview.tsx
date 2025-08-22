// import { useNavigate } from 'react-router-dom';
// import useBuilder from '../../hooks/useBuilder';
// import { X } from 'lucide-react';

import { X } from "lucide-react"
import { BuilderContextProps } from "../../context/BuilderContext"
import useBuilder from "../../hooks/useBuilder"
import ComponentRenderer from "../builder/ComponentRenderer"
import { useNavigate } from "react-router-dom"

// import ComponentRenderer from '../builder/ComponentRenderer';
// import { BuilderContextProps } from '../../context/BuilderContext';
// import { CanvasType } from '../../types/types';
// import { useEffect, useRef, useState } from 'react';

// function Preview() {
//   const { sections } = useBuilder() as BuilderContextProps;
//   const navigate = useNavigate();
//   const fullRef = useRef(null);

//   const [canvasSize, setCanvasSize] = useState({
//     width:window.innerWidth, 
//     height:window.innerHeight
//   })

//   useEffect(() => {
//     const handleResize = () => {
//       setCanvasSize({
//         width: window.innerWidth,
//         height: window.innerHeight
//       });
//     };

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   console.log(fullRef.current)
  


//   return (
//     <div>
//       <header className='bg-white items-center justify-between flex w-full p-[0.4rem] border border-b border-gray-200'>
//         <span className='w-9 h-9 flex items-center justify-center bg-white rounded-full'>
//           <img src='logo.png' alt='logo' />
//         </span>
//         <p className='text-[0.856rem]'>Preview</p>
//         <button
//           className='flex items-center justify-center border border-gray-400 rounded-lg text-sm p-1'
//           onClick={() => navigate('/')}
//         >
//           <X className='w-4 h-4' />
//         </button>
//       </header>
//       <div className='bg-white relative flex flex-col items-center -gap-0.5'
//       style={{ width: canvasSize.width, height: canvasSize.height }}
//       ref={fullRef}
//       >
//         {sections.map((element: CanvasType) => (
//           <div
//             key={element.id}
//           >
//             <ComponentRenderer element={element} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Preview;


function Preview() {
  const {page:selectedPage} = useBuilder() as BuilderContextProps

  console.log(selectedPage.content)
  return(
    <div className="w-full h-screen bg-gray-100">
      <Navbar />
      {selectedPage.content.map((content) => (
        <ComponentRenderer element={content} key={content.id} />
      ))}
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