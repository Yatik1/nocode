import React, { createContext, useState } from 'react';
import { CanvasType, ElementType } from '../types/types';
import { getDefaultProps } from '../util/getProps';
;


export type BuilderContextProps = {
    open:boolean, 
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    elements: ElementType[],
    setElements: React.Dispatch<React.SetStateAction<ElementType[]>>;
    selectedElement: ElementType | CanvasType | null
    setSelectedElement: React.Dispatch<React.SetStateAction<ElementType | CanvasType | null>>;
    childrens?:ElementType[],
    setChildrens?:React.Dispatch<React.SetStateAction<ElementType[]>>,
    sections:CanvasType[],
    setSections?:React.Dispatch<React.SetStateAction<CanvasType[]>>,
    updateElementProps:(props:CanvasType | ElementType) => void;
}

export const BuilderContext = createContext<BuilderContextProps | null>(null)

export default function BuilderProvider({children} : {children: React.ReactNode}) {

    const [elements, setElements] = useState<ElementType[]>([])
    const [selectedElement, setSelectedElement] = useState<ElementType | CanvasType | null>(null)
    const [childrens, setChildrens] = useState<ElementType[]>([])
    const [open,setOpen] = useState<boolean>(false)

    const [sections, setSections] = useState<CanvasType[]>([
        {
            id: `canvas-${Date.now()}`,
            type: "canvas",
            props: getDefaultProps('canvas'),
            childrens: [],
        },
    ]);


    function updateElementProps(update: { id: string; props: ElementType['props'] | CanvasType['props'] }) {
      function updateElementRecursive(elements: ElementType[]): ElementType[] {
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
                children: updateElementRecursive(el.props.children),
              },
            };
          }
          return el;
        });
      }

      function updateCanvasRecursive(sections: CanvasType[]): CanvasType[] {
        return sections.map(section => {
          if (section.id === update.id) {
            return {
              ...section,
              props: {
                ...section.props,
                ...update.props,
              },
            };
          }
          if (Array.isArray(section.childrens)) {
            return {
              ...section,
              childrens: updateElementRecursive(section.childrens),
            };
          }
          return section;
        });
      }

      setSections(prev => {
        const updated = updateCanvasRecursive(prev);
        return updated;
      });

      setSelectedElement(prev =>
        prev?.id === update.id
          ? { ...prev, props: { ...prev.props, ...update.props } }
          : prev
      );
    }
    
    

    return (
        <BuilderContext.Provider value={{open, setOpen, elements, setElements, selectedElement, setSelectedElement, childrens, setChildrens,updateElementProps, sections, setSections}}>
            {children}
        </BuilderContext.Provider>
    )
}

