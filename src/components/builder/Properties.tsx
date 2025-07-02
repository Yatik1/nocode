import { Trash, X } from "lucide-react"
import useBuilder from "../../hooks/useBuilder"
import PropertyRenderer from "./PropertyRenderer"
import { ElementType, CanvasType } from "../../types/types";
import { BuilderContextProps } from "../../context/BuilderContext";

export default function Properties() {
  const { selectedElement, setSelectedElement, setSections } = useBuilder() as BuilderContextProps

  function deleteElementFromSections(sections: CanvasType[], elementId: string | undefined): CanvasType[] {
    if (!elementId) return sections;
    
    return sections.map((section: CanvasType) => ({
      ...section,
      childrens: section.childrens.filter((element: ElementType) => element.id !== elementId)
    }));
  }

  const handleDelete = () => {
    if (!selectedElement || !selectedElement.id) return;
    
    if(setSections){
      setSections((prev: CanvasType[]) => 
        deleteElementFromSections(prev, selectedElement.id)
      );
    }
    
    setSelectedElement(null);
  }

  return (
    <div className="fixed z-30 right-0 top-0 w-68 min-h-screen h-[100%] bg-white border-l border-gray-200 p-3 overflow-auto">
      <div className="flex items-center justify-between">
        <div className="text-md font-semibold capitalize">
          {selectedElement?.type} Properties
        </div>
        <div className="flex items-center justify-center gap-2">
          <button 
            className="flex items-center justify-center p-1 rounded-md bg-red-500 text-white gap-2 hover:bg-red-700 cursor-pointer"
            onClick={handleDelete}
          >
            <Trash className="w-4 h-4" />
          </button>
          <button 
            className="flex items-center justify-center rounded-md bg-gray-50 border border-gray-200 cursor-pointer p-1" 
            onClick={() => setSelectedElement(null)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <hr className="text-gray-200 mt-2" />
      <div className="flex flex-1 flex-wrap overflow-auto mt-5">
        {selectedElement && <PropertyRenderer element={selectedElement} />}
      </div>
    </div>
  )
}