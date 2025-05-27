import { Trash, X } from "lucide-react"
import useBuilder from "../../hooks/useBuilder"

import PropertyRenderer from "./PropertyRenderer"
import { ElementType } from "react";

export default function Properties() {

  const {selectedElement, setSelectedElement,setElements} = useBuilder() as any

  function deleteElementById(elements:any, idToDelete:any) {
    return elements
      .map((element:ElementType | any) => {
        if (element.props?.children) {
          return {
            ...element,
            props: {
              ...element.props,
              children: deleteElementById(element.props.children, idToDelete)
            }
          };
        }
        return element;
      })
      .filter((element:any) => element.id !== idToDelete);
  }
  

  return (
    <div className="w-68 bg-white h-screen border-r border-gray-200 p-3 overflow-auto">
      <div className="flex items-center justify-between">
        <div className="text-md font-semibold capitalize"> {selectedElement.type} Properties</div>
        <div className="flex items-center justify-center gap-2">
          <button className="flex items-center justify-center p-1 rounded-md bg-red-500 text-white gap-2 hover:bg-red-700 cursor-pointer"
          onClick={() => {
            setElements((prev: any[]) => deleteElementById(prev, selectedElement.id));
            setSelectedElement(null);
          }}
        > 
          <Trash className="w-4 h-4" />
        </button>
        <button className="flex items-center justify-center rounded-md bg-gray-50 border border-gray-200 cursor-pointer" onClick={() => setSelectedElement(null)}>
          <X className="w-5 h-5" />
        </button>
        </div>
      </div>
      <hr className="text-gray-200 mt-2" />
      <div className="flex flex-1 flex-wrap overflow-auto mt-5">
        <PropertyRenderer element={selectedElement} />
      </div>
      
    </div>
  )
}
