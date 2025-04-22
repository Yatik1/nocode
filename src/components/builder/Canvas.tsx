import React, { useRef } from 'react';
import ComponentRenderer from './ComponentRenderer';
import useBuilder from '../../hooks/useBuilder';



export interface ElementType {
  id: string;
  type: string;
  props: Record<string, any>;
}


function Canvas() {

  const {elements, setElements, setSelectedElement} : any  = useBuilder()
  const canvasRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLDivElement>(null)

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

  return (
    <>
      <div 
      className="flex-1 p-6"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      ref={canvasRef}
    >
      <div className="max-w-4xl mx-auto min-h-[calc(100vh-2rem)] flex flex-col bg-white rounded-lg shadow-sm mb-2 overflow-auto">
        {elements.map((element:ElementType) => (
          <div  
            key={element.id}
            onClick={() =>setSelectedElement(element)}
            ref={elementRef} 
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
      return { text: 'Button', bgColor:"black", color:"#FFFFFF", rounded:"0"};
    case 'section':
      return { backgroundColor: 'white', padding: 'medium' };
    case 'navbar':
      return { 
        links: [
          { text: 'Home', href: '#' },
          { text: 'About', href: '#' },
          { text: 'Contact', href: '#' }
        ]
      };
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