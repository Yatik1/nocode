import { ChevronDown, Cloud, Grip, Hand, Play, Plus, Square } from "lucide-react"
import { CanvasType } from "../../types/types";
import { getDefaultProps } from "../../utils/getProps";
import useBuilder from "../../hooks/useBuilder";
import { BuilderContextProps } from "../../context/BuilderContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"


function ControlPanel() {

  const {updatePageContent, setSelectedElement} = useBuilder() as BuilderContextProps
  const location = useLocation() as {pathname:string}
  const navigate = useNavigate()

  // const [project, setProject] = useState(null);
  // const [email, setEmail] = useState(""); // ✅ Added email state

  const {pages} = useBuilder() as BuilderContextProps

  function addSection() {
    if(location.pathname!=="/") return;

    const newSection: CanvasType = {
      id: `canvas-${Date.now()}`,
      type: "canvas",
      props: getDefaultProps('canvas'),
      childrens: [],
    };

    updatePageContent((prev) => [...prev, newSection]);
  }

   async function saveHandler() {
    try {
      const save_payload = {
        project:4,
        json:pages
      }

      console.log(save_payload)

     await axios.post("http://127.0.0.1:8030/project-publish-save/", save_payload)
     console.log("Json uploaded")
      
    } catch (error) {
      console.error("Error occured while saving json", error)
    }


  }

  function onPreview() {
      setSelectedElement(null)
      navigate("/preview")
    }

  return (
    <div className="fixed z-[999%] min-w-[5rem] rounded-md bg-white border-[0.5px] border-gray-100 top-[90%] drop-shadow-md flex items-center justify-center">
        <div className="flex items-center justify-center gap-1.5 border-r border-gray-200 px-3 py-2">
         <button className="flex items-center justify-center text-blue-700 bg-blue-200 px-2 py-1 rounded-md" onClick={addSection}>
            <Plus strokeWidth={1.5} size={22} />
            <p className="text-md font-light tracking-tight">Add section</p>
        </button>

       <Grip size={22} className="text-[#444544]" />
       </div>

       <div className="flex items-center justify-center gap-1.5 border-r border-gray-200 px-2 py-[0.8em]">
         <div className="flex items-center justify-center gap-0.2">
              <Square strokeWidth={1.5} size={22} className="text-[#444544]" />
              <ChevronDown strokeWidth={1} size={15} className="text-[#444544]" />
          </div>
              <Hand strokeWidth={1.5} size={22} className="text-[#444544]" />
       </div>

       <div className="flex items-center justify-center gap-1.5 px-3 py-2">
          <Play strokeWidth={1.5} size={22} className="text-[#444544]" onClick={onPreview} />
          <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-400 text-white rounded-md px-2 py-1 gap-1" onClick={saveHandler}>
            <Cloud strokeWidth={1.5} size={20} />
            <p className="text-sm font-light tracking-tight">Save</p>
          </button>

       </div>

    </div>
  )
}

export default ControlPanel