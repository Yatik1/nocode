import { Trash, X } from "lucide-react"
import useBuilder from "../../hooks/useBuilder"
import PropertyRenderer from "./PropertyRenderer"
import { ElementType, CanvasType } from "../../types/types";
import { BuilderContextProps } from "../../context/BuilderContext";

export default function Properties() {
  const { selectedElement, setSelectedElement, setSections } = useBuilder() as BuilderContextProps

  function deleteElementFromSections(sections: CanvasType[], elementId: string): CanvasType[] {
    function deleteFromElementProps(elements: ElementType[]): ElementType[] {
      return elements
        .filter(el => el.id !== elementId)
        .map(el => {
          if (Array.isArray(el.props?.children)) {
            return {
              ...el,
              props: {
                ...el.props,
                children: deleteFromElementProps(el.props.children),
              },
            };
          }
          return el;
        });
    }
  
    return sections.map(section => {
      const updatedChildrens = section.childrens
        .filter(child => child.id !== elementId)
        .map(child => {
          if (Array.isArray(child.props?.children)) {
            return {
              ...child,
              props: {
                ...child.props,
                children: deleteFromElementProps(child.props.children),
              },
            };
          }
          return child;
        });
  
      return {
        ...section,
        childrens: updatedChildrens,
      };
    });
  }

  const handleDelete = () => {
  if (!selectedElement || !selectedElement.id) return;

  if(setSections) {
    setSections(prev => 
      deleteElementFromSections(prev, selectedElement.id)
    );
  }

  setSelectedElement(null);
};

  return (
    <div className="fixed z-30 right-0 top-0 min-w-68 w-auto min-h-screen h-[100%] bg-white border-l border-gray-200 p-3 overflow-auto">
      <div className="flex items-center justify-between">
        <div className="text-md font-semibold capitalize">
          {selectedElement?.type} Properties
        </div>
        <div className="flex items-center justify-center gap-2">
        {selectedElement?.type !== "canvas" && (
          <button 
          className="flex items-center justify-center p-1 rounded-md bg-red-500 text-white gap-2 hover:bg-red-700 cursor-pointer"
          onClick={handleDelete}
        >
          <Trash className="w-4 h-4" />
        </button>
        )}
          
          <button 
            className="flex items-center justify-center rounded-md bg-gray-50 border border-gray-200 cursor-pointer p-1" 
            onClick={() => setSelectedElement(null)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>
      <hr className="text-gray-200 mt-2" />
      <div className="flex flex-1 flex-wrap overflow-auto mt-5 relative">
        {selectedElement && <PropertyRenderer element={selectedElement} />}
      </div>
    </div>
  )
}