
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
      className={`flex gap-4 border border-gray-200 w-full min-h-30 h-auto items-${props.alignItems} justify-${props.justifyContent} hover:border-blue-200`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}  
    >
        {children ? ( 
          children.map((child:any, index:any) => (
            <div key={index}>
              <ComponentRenderer key={index} element={child}  />
            </div>
          ))
        ) : 
        (
          <div className="h-full flex items-center justify-center text-gray-400">
            Drop component here
          </div>
        )
      }

    </div>
  )
}

export default FlexRow