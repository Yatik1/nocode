import React, { useState } from 'react';
import ComponentRenderer from './ComponentRenderer';
import useBuilder from '../../hooks/useBuilder';



export interface ElementType {
  id: string;
  type: string;
  props: Record<string, any>;
}


function Canvas() {

  const {elements, setElements, setSelectedElement} : any  = useBuilder()
  const [copiedElement, setCopiedElement] = useState<ElementType | null>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const elementType = e.dataTransfer.getData('componentId');

    const newElement: ElementType = {
      id: `${elementType}-${Date.now()}`,
      type: elementType,
      props: getDefaultProps(elementType),
    };

    setElements([...elements, newElement]);
  };
 
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  function onCopyEvent(e:React.ClipboardEvent, element:ElementType) {
    e.preventDefault()
    setCopiedElement(element)
  }

  function onPasteEvent(e:React.ClipboardEvent) {
    e.preventDefault()
    if(copiedElement) {
      const newElementId = `${copiedElement.type}-${Date.now()}`
      const newElement:ElementType = {
        ...copiedElement,
        id: newElementId
      } 
      setElements([...elements, newElement])
    }
  }


  return (
    <>
      <div 
      className="flex-1 p-3 h-auto"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="h-full flex flex-col bg-white shadow-black drop-shadow-md border border-gray-300 overflow-auto">
          {elements.map((element: ElementType) => (
            <div
              key={element.id}
              onClick={() => setSelectedElement(element)}
              onCopy={(e:any) => onCopyEvent(e,element)}
              onPaste={onPasteEvent}
            >
              <ComponentRenderer element={element} />
            </div>
          ))}
      </div>
    </div>
    
    </>
  );
}

export function getDefaultProps(sectionType: string): Record<string, any> {

  switch (sectionType) {

    case 'heading':
      return { text: 'New Heading', level: 'h2',color:"#000000", bgColor:"none"};
    case 'text':
      return { content: 'Add your text here', bgColor:"none", color:"#000000", fontStyle:"normal", decoration:"none" };
    case 'image':
      return { 
        src: "",
        width:"100",
        height:"100"
      };
    case 'button':
      return { text: 'Button', bgColor:"gray", color:"white", rounded:"0"};
    case 'section':
      return { backgroundColor: 'lightgray', height:"", width:"", direction:"row", children:[]};
    case 'flex-row':
      return {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"",
        children:[] 
       }

    case 'flex-col':
      return {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"",
        children:[]
      }
    default:
      return {};
  }
}

export default Canvas