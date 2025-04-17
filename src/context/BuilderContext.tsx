import React, { createContext, useState } from 'react';
import {ElementType} from '../components/builder/Canvas.tsx';


export type BuilderContextProps = {
    elements: ElementType[],
    setElements: React.Dispatch<React.SetStateAction<ElementType[]>>;
    selectedElement: ElementType | null
    setSelectedElement: React.Dispatch<React.SetStateAction<ElementType | null>>;
    childrens?:ElementType[],
    setChildrens?:React.Dispatch<React.SetStateAction<ElementType[]>>
    updateElementProps:(props:any) => void
}

export const BuilderContext = createContext<BuilderContextProps | null>(null)

export default function BuilderProvider({children} : {children: React.ReactNode}) {

    const [elements, setElements] = useState<ElementType[]>([])
    const [selectedElement, setSelectedElement] = useState<ElementType | null>(null)
    const [childrens, setChildrens] = useState<ElementType[]>([])

    
    function updateElementProps(newProps: any) {
        setSelectedElement(prev => {
          if (!prev) return prev;
          const updated = { ...prev, props: { ...prev.props, ...newProps } };
      
          setElements(els =>
            els.map(el => (el.id === updated.id ? updated : el))
          );
      
          return updated;
        });
      }

    return (
        <BuilderContext.Provider value={{elements, setElements, selectedElement, setSelectedElement, childrens, setChildrens,updateElementProps}}>
            {children}
        </BuilderContext.Provider>
    )
}

