
import { useState } from "react";
import { ElementType, getDefaultProps } from "../Canvas"
import ComponentRenderer from "../ComponentRenderer"

function FlexRow({props}:{props:any}) {

  const [children, setChildren] = useState(props.children || [])

  function handleDrop(e:React.DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    const childComponentType = e.dataTransfer.getData('componentId')

    const newChildElement:ElementType = {
      id:`${childComponentType}-${Date.now()}`,
      type:childComponentType,
      props:getDefaultProps(childComponentType)
    }

    setChildren((prevChildren:any) => [...prevChildren, newChildElement])
  }

  function handleDragOver(e:React.DragEvent) {
    e.preventDefault();
  }

  return (
    <div 
      className={`flex flex-1 gap-4 border border-gray-400 border-dashed w-full min-h-30 items-${props.alignItems} justify-${props.justifyContent} hover:border-blue-200`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}  
    >
        {children.length !== 0 ? ( 
          children.map((child:any, index:any) => (
            <div key={index}>
              <ComponentRenderer element={child}  />
            </div>
          ))
        ) : 
        (
          <div className={`h-full flex items-center justify-center`}>
            Drop component here
          </div>
        )
      }

    </div>
  )
}

export default FlexRow