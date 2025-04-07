import React, { createContext, useState } from 'react';
import {ElementType} from '../components/builder/Canvas.tsx';


export type BuilderContextProps = {
    elements: ElementType[],
    setElements: React.Dispatch<React.SetStateAction<ElementType[]>>;
    selectedElement: ElementType | null
    setSelectedElement: React.Dispatch<React.SetStateAction<ElementType | null>>;
    childrens?:ElementType[],
    setChildrens?:React.Dispatch<React.SetStateAction<ElementType[]>>
}

export const BuilderContext = createContext<BuilderContextProps | null>(null)

export default function BuilderProvider({children} : {children: React.ReactNode}) {

    const [elements, setElements] = useState<ElementType[]>([])
    const [selectedElement, setSelectedElement] = useState<ElementType | null>(null)
    const [childrens, setChildrens] = useState<ElementType[]>([])

    return (
        <BuilderContext.Provider value={{elements, setElements, selectedElement, setSelectedElement, childrens, setChildrens}}>
            {children}
        </BuilderContext.Provider>
    )
}

