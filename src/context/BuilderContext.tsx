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
    updateElementProps: (update: {
  id: string;
  props: ElementType['props'] | CanvasType['props'];
  x?: number;
  y?: number;
  type?: string;
}) => void;
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


    function updateElementProps(update: {
  id: string;
  props: ElementType['props'] | CanvasType['props'];
  x?: number;
  y?: number;
  type?: string;
}) {
  function updateElementRecursive(elements: ElementType[]): ElementType[] {
    return elements.map(el => {
      if (el.id === update.id) {
        return {
          ...el,
          props: {
            ...el.props,
            ...update.props,
          },
          x: update.x !== undefined ? update.x : el.x,
          y: update.y !== undefined ? update.y : el.y,
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

      return {
        ...section,
        childrens: updateElementRecursive(section.childrens),
      };
    });
  }

  setSections(prev => updateCanvasRecursive(prev));

  setSelectedElement(prev => {
  if (!prev || prev.id !== update.id) return prev;

  const updatedProps = {
    ...prev.props,
    ...update.props,
  };

  // CASE: CanvasType (no x/y)
  if ('childrens' in prev) {
    return {
      ...prev,
      props: updatedProps,
    };
  }

  // CASE: ElementType (has x/y)
  return {
    ...prev,
    props: updatedProps,
    x: update.x !== undefined ? update.x : prev.x,
    y: update.y !== undefined ? update.y : prev.y,
  };
});

}

    
    

    return (
        <BuilderContext.Provider value={{open, setOpen, elements, setElements, selectedElement, setSelectedElement, childrens, setChildrens,updateElementProps, sections, setSections}}>
            {children}
        </BuilderContext.Provider>
    )
}

