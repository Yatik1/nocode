import { Trash, X } from "lucide-react";
import useBuilder from "../../hooks/useBuilder";
import PropertyRenderer from "./PropertyRenderer";
import { ElementType, CanvasType } from "../../types/types";
import { BuilderContextProps } from "../../context/BuilderContext";

export default function Properties() {
  const { selectedElement, setSelectedElement, updatePageContent } = useBuilder() as BuilderContextProps;

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
    <div className="fixed z-30 right-0 top-0 min-w-68 w-auto min-h-screen bg-white border-l border-gray-200 p-3 overflow-auto">
      <div className="flex items-center justify-between">
        <div className="text-md font-semibold capitalize">
          {selectedElement?.type || "No Selection"}
        </div>
        <div className="flex items-center gap-2">
          {selectedElement?.type !== "canvas" && (
            <button
              className="flex items-center justify-center p-1 rounded-md bg-red-500 text-white hover:bg-red-700 cursor-pointer"
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
      <div className="flex flex-1 flex-wrap overflow-auto mt-5">
        {selectedElement && <PropertyRenderer element={selectedElement} />}
      </div>
    </div>
  );
}
