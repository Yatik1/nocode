import React from 'react'
import { CanvasType, ElementType } from '../../../types/types'
import useBuilder from '../../../hooks/useBuilder'
import { BuilderContextProps } from '../../../context/BuilderContext'
import { getDefaultProps } from '../../../utils/getProps'
import { addElementToContainer } from '../../../utils/addElementToChildren'
import ComponentRenderer from '../ComponentRenderer'
import { handleElementDragStart } from '../../../utils/handleElementDragStart'

function Container({id, props, childrens}:CanvasType) {

  const {setSections, selectedElement, setSelectedElement, setElements} = useBuilder() as BuilderContextProps;

  const handleDrop = (e:React.DragEvent) => {

    e.preventDefault()
    e.stopPropagation()

    const childElementType = e.dataTransfer.getData("componentId");
    if(!childElementType) return;

    const newElement : ElementType = {
      id: `${childElementType}-${Date.now()}`,
        type: childElementType,
        props: getDefaultProps(childElementType),
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
    }

    if(setSections) {
      setSections((prev) => addElementToContainer(prev, id, newElement));
    }

  }

  function handleDragOver(e:React.DragEvent) {
    e.preventDefault()
  }

  return (
    <section
      id={id}
      className="relative"
      data-section-id={id}
      onDrop={handleDrop}
      onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedElement({id,props, childrens: childrens || [], type:"container"});} }
      onDragOver={handleDragOver}
      style={{
        background: props.backgroundColor,
        width: props.width + props.widthUnit,
        height: props.height + props.heightUnit,
        borderRadius:props.rounded+"%",
        opacity:props.opacity
        
      }}
    >
      {childrens && childrens.map((element:ElementType) => (
                <div 
                    key={element.id}
                    data-element-id={element.id}
                    onClick={(e:React.MouseEvent) => {e.preventDefault();e.stopPropagation();setSelectedElement(element)}}
                    onMouseDownCapture={(e) => {e.preventDefault();e.stopPropagation();handleElementDragStart(e, element.id, childrens, setElements)}}
                    className={`${selectedElement?.id === element.id ? "border border-blue-500" : ""} absolute w-fit`}
                    style={{
                        top:  element.y,
                        left: element.x,
                        cursor: "move",
                        userSelect: "none",
                    }}
                >
                        <ComponentRenderer key={element.id} element={element} />
                </div>
      ))}
    </section>
  )
}

export default Container