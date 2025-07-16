import React, { useEffect, useState } from 'react'
import { CanvasType, ElementType } from '../../types/types'
import useBuilder from '../../hooks/useBuilder'
import { BuilderContextProps } from '../../context/BuilderContext'
import { getDefaultProps } from '../../util/getProps';
import ComponentRenderer from './ComponentRenderer';
import { Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { handleElementDragStart } from '../../util/handleElementDragStart';
import { toast } from 'sonner';

function Canvas({id, props, childrens}:CanvasType) {

  const { setSections, setSelectedElement, selectedElement, setElements, updateElementProps} = useBuilder() as BuilderContextProps;
  const [copiedElement, setCopiedElement] = useState<ElementType | null>(null)
  const location = useLocation() as { pathname: string };


const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData("componentId");
    if (!elementType) return;

    const newElement: ElementType = {
        id: `${elementType}-${Date.now()}`,
        type: elementType,
        props: getDefaultProps(elementType),
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
    };

    if(setSections) {
        setSections((prev: CanvasType[]) =>
            prev.map(section =>
                section.id === id
                    ? { ...section, childrens: [...(section.childrens || []), newElement] }
                    : section
            )
        );
    }
};

  function handleDragOver(e:React.DragEvent) {
    e.preventDefault()
  }

  function addSection() {
    const newSection: CanvasType = {
        id: `canvas-${Date.now()}`,
        type:"canvas",
        props: getDefaultProps('canvas'),
        childrens:[]
    }

    if(setSections) setSections((prev:CanvasType[]) => [...prev, newSection ]);
  }

  useEffect(() => {
    const handleCopy = (e:ClipboardEvent) => {
        if(selectedElement && selectedElement.type !== "canvas") {
            e.preventDefault();
            setCopiedElement(JSON.parse(JSON.stringify(selectedElement)))
            toast.message("Copied", {description:"Paste the element using Ctrl+V"})
        }
    }

    const handlePaste = (e:ClipboardEvent) => {
        if(copiedElement) {
            e.preventDefault()
            const newElement : ElementType = {
                ...JSON.parse(JSON.stringify(copiedElement)),
                id: `${copiedElement.type}-${Date.now()}`,
                x: copiedElement.x ? copiedElement.x + 25 : 25,
                y: copiedElement.y ? copiedElement.y + 25 : 25,
            }
            
            if(setSections) {
                setSections((prev: CanvasType[]) =>
                prev.map(section =>
                    section.id === id
                        ? { ...section, childrens: [...(section.childrens || []), newElement] }
                        : section
                )
            );
            }

            toast.message("Pasted", {description:"Element pasted successfully"})
        }
    }

    window.addEventListener("copy", handleCopy);
    window.addEventListener("paste", handlePaste);  

    return () => {
            window.removeEventListener("copy", handleCopy);
            window.removeEventListener("paste", handlePaste);
        }
  },[selectedElement, copiedElement])


  return (
    <>
        <div
        id={id}
        className={`relative bg-white ${location.pathname!== "/preview" ? "shadow-black drop-shadow-md border border-gray-300 " : ""}overflow-hidden canvas-area`}
        style={{width:location.pathname !== "/preview" ? props.width-25 : props.width, height:location.pathname !== "/preview" ? props.height-70 : props.height, backgroundColor: props.backgroundColor}}
        data-section-id={id}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => {
            setSelectedElement({
                id,
                props,
                type: "canvas",
                childrens: childrens || []
            })
        }}
        >
            {childrens && childrens.map((element:ElementType) => (
                <div 
                    key={element.id}
                    data-element-id={element.id}
                    onClick={(e:React.MouseEvent) => {e.preventDefault();e.stopPropagation();setSelectedElement(element)}}
                    onMouseDownCapture={(e) => {e.preventDefault();e.stopPropagation();handleElementDragStart(e, element.id, childrens, setElements)}}
                    className={`${selectedElement?.id === element.id ? "border border-blue-500" : ""} absolute w-fit flex items-center justify-center`}
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
        </div>
        {
            location.pathname !== "/preview" && (
                <button 
            className='absolute z-999 -bottom-1 left-1/2 -translate-x-1/2 bg-gray-200 text-sm text-gray-600 border border-gray-300 rounded-md p-1 flex items-center justify-center hover:bg-blue-200 hover:text-blue-600 hover:border-blue-500'
            onClick={addSection}
        >
            <Plus size={15} /> Add section
        </button> 
            )
        } 
    </>
  )
}



export default Canvas