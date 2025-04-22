import React, { createContext, useState } from 'react';
import {ElementType} from '../components/builder/Canvas.tsx';


export type BuilderContextProps = {
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

    // function updateElementProps(update: { id: string; props: any }) {
    //   setElements(prevElements =>
    //     prevElements.map(el =>
    //       el.id === update.id
    //         ? { ...el, props: { ...el.props, ...update.props } }
    //         : el
    //     )
    //   );

    //   setSelectedElement(prev =>
    //     prev && prev.id === update.id
    //       ? { ...prev, props: { ...prev.props, ...update.props } }
    //       : prev
    //   );
    // }

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
        // console.log("✅ Updated elements", JSON.stringify(updated, null, 2));
        return updated;
      });
    
      setSelectedElement(prev =>
        prev?.id === update.id
          ? { ...prev, props: { ...prev.props, ...update.props } }
          : prev
      );
    }
    
    

    return (
        <BuilderContext.Provider value={{elements, setElements, selectedElement, setSelectedElement, childrens, setChildrens,updateElementProps}}>
            {children}
        </BuilderContext.Provider>
    )
}

