import React, { createContext, useState } from 'react';
import {ElementType} from '../components/builder/Canvas.tsx';


export type BuilderContextProps = {
    open:boolean, 
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    elements: ElementType[],
    setElements: React.Dispatch<React.SetStateAction<ElementType[]>>;
    selectedElement: ElementType | null
    setSelectedElement: React.Dispatch<React.SetStateAction<ElementType | null>>;
    childrens?:ElementType[],
    setChildrens?:React.Dispatch<React.SetStateAction<ElementType[]>>
    updateElementProps:(props:any) => void;
}

export const BuilderContext = createContext<BuilderContextProps | null>(null)

export default function BuilderProvider({children} : {children: React.ReactNode}) {

    const [elements, setElements] = useState<ElementType[]>([])
    const [selectedElement, setSelectedElement] = useState<ElementType | null>(null)
    const [childrens, setChildrens] = useState<ElementType[]>([])
    const [open,setOpen] = useState<boolean>(false)

    function updateElementProps(update: { id: string; props: any }) {
      function updateRecursive(elements: ElementType[]): ElementType[] {
        return elements.map(el => {
          if (el.id === update.id) {
            return {
              ...el,
              props: {
                ...el.props,
                ...update.props,
              },
            };
          }
    
          if (Array.isArray(el.props?.children)) {
            return {
              ...el,
              props: {
                ...el.props,
                children: updateRecursive(el.props.children),
              },
            };
          }
    
          return el;
        });
      }
    
      setElements(prev => {
        const updated = updateRecursive(prev);
        return updated;
      });
    
      setSelectedElement(prev =>
        prev?.id === update.id
          ? { ...prev, props: { ...prev.props, ...update.props } }
          : prev
      );
    }
    
    

    return (
        <BuilderContext.Provider value={{open, setOpen, elements, setElements, selectedElement, setSelectedElement, childrens, setChildrens,updateElementProps}}>
            {children}
        </BuilderContext.Provider>
    )
}

