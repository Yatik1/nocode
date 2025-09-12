import { CircleFadingPlus, Minus, X } from "lucide-react";
import useBuilder from "../../hooks/useBuilder";
import PropertyRenderer from "./PropertyRenderer";
import { ElementType, CanvasType } from "../../types/types";
import { BuilderContextProps } from "../../context/BuilderContext";

export default function Properties() {
  const { selectedElement, setSelectedElement, updatePageContent, setIsBgColorPicker, setIsColorPicker } = useBuilder() as BuilderContextProps;

  function deleteFromChildrens(elements: ElementType[], elementId: string): ElementType[] {
    return elements
      .filter(el => el.id !== elementId)
      .map(el => ({
        ...el,
        childrens: el.childrens ? deleteFromChildrens(el.childrens, elementId) : undefined,
        props: {
          ...el.props,
          children: Array.isArray(el.props.children)
            ? el.props.children.filter((child: ElementType) => child.id !== elementId)
            : el.props.children,
        },
      }));
  }
  

  const deleteElementFromSections = (sections: CanvasType[], elementId: string): CanvasType[] => {
    return sections.map(section => ({
      ...section,
      childrens: deleteFromChildrens(section.childrens, elementId),
    }));
  };

  const handleDelete = () => {
    if (!selectedElement?.id) return;

    updatePageContent(prev => deleteElementFromSections(prev, selectedElement.id));
    setSelectedElement(null);
  };

  return (
    <div className="absolute right-0">
      <div className="fixed z-30 right-2 top-2 w-68 h-[98vh] bg-white border border-gray-200 rounded-md" >
        
        <div className="w-full flex items-center justify-between p-3">
          
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <p className="uppercase text-white">Y</p>
            </div>
            <CircleFadingPlus strokeWidth={1.5} size={20} />
          </div>

          <div className="flex items-center justify-center gap-2">
            <button className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md">
              Publish
            </button>
            <X strokeWidth={1.5} size={20} onClick={() => { setIsBgColorPicker(false); setIsColorPicker(false); setSelectedElement(null); }} className="cursor-pointer" />
          </div>

        </div>

      <hr className="text-gray-100" />


      <div className="flex items-center justify-between p-3">
        
        <div className="text-md font-medium capitalize">
          {selectedElement?.type || "No Selection"}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center rounded-md bg-red-100 text-red-500   cursor-pointer p-1"
            onClick={handleDelete}
          >
            <Minus strokeWidth={1.5} size={20} />
          </button>
        </div>

      </div>

      <hr className="text-gray-100" />

      <div className="flex p-3">
        {selectedElement && <PropertyRenderer element={selectedElement} />}
      </div>
    </div>



    </div>
  );
}
