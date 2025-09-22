import React, { createContext, useEffect, useState } from 'react';
import { CanvasType, ElementType, PageType, Transform } from '../types/types';
import { getDefaultProps } from '../utils/getProps';

export type BuilderContextProps = {
  pages: PageType[],
  setPages: React.Dispatch<React.SetStateAction<PageType[]>>,
  page: PageType,
  setPage: React.Dispatch<React.SetStateAction<PageType>>,

  open:boolean,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>,

  elements: ElementType[],
  setElements: React.Dispatch<React.SetStateAction<ElementType[]>>,
  selectedElement: ElementType | CanvasType | null,
  setSelectedElement: React.Dispatch<React.SetStateAction<ElementType | CanvasType | null>>,
  updateElementProps: (update: {
    id: string;
    props: ElementType['props'] | CanvasType['props'];
    x?: number;
    y?: number;
    type?: string;
  }) => void;
  updatePageContent: (updater: (content: CanvasType[]) => CanvasType[]) => void;

  // transformation states for infinite canvas
  transform: Transform
  setTransform: React.Dispatch<React.SetStateAction<Transform>>

  // active state for handling color picker
  activeColorPicker:string | null, 
  setActiveColorPicker:React.Dispatch<React.SetStateAction<string|null>>
  
}

export const BuilderContext = createContext<BuilderContextProps | null>(null);

export default function BuilderProvider({ children }: { children: React.ReactNode }) {

  const initialCanvas: CanvasType = {
    id: `canvas-${Date.now()}`,
    type: "canvas",
    props: getDefaultProps('canvas'),
    childrens: [],
  };

  const initialPage: PageType = {
    id: `page-${Date.now()}`,
    pageNumber: 1, 
    pageName: "Home",
    content: [initialCanvas],
  };

  const [pages, setPages] = useState<PageType[]>([initialPage]);
  const [page, setPage] = useState<PageType>(initialPage);

  const [open, setOpen] = useState<boolean>(false);

  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null)

  const [elements, setElements] = useState<ElementType[]>([]);
  const [selectedElement, setSelectedElement] = useState<ElementType | CanvasType | null>(null);

  const [transform, setTransform] = useState<Transform>({x: 189.07076579782336, y: 88.84413322710449, scale: 0.6973620836652986});


  useEffect(() => {
    setPages((prevPages) =>
      prevPages.map((p) => (p.id === page.id ? { ...page } : p))
    );
  }, [page]);

  function updatePageContent(updater: (content: CanvasType[]) => CanvasType[]) {
    setPage((prev) => ({
      ...prev,
      content: updater(prev.content),
    }));
  }

  function updateElementProps(update: {
    id: string;
    props: ElementType['props'] | CanvasType['props'];
    x?: number;
    y?: number;
    type?: string;
  }) {
    function updateElementRecursive(element: ElementType): ElementType {
      if (element.id === update.id) {
        return {
          ...element,
          props: {
            ...element.props,
            ...update.props,
          },
          x: update.x !== undefined ? update.x : element.x,
          y: update.y !== undefined ? update.y : element.y,
        };
      }

      const updatedChildrens = Array.isArray(element.childrens)
        ? element.childrens.map(updateElementRecursive)
        : element.childrens;

      // Handle row/column style children stored under props.children
      const hasPropsChildren = element.props && Array.isArray((element.props as Record<string, unknown>).children);
      const updatedPropsChildren = hasPropsChildren
        ? (element.props.children as ElementType[]).map(updateElementRecursive)
        : element.props?.children;

      return {
        ...element,
        childrens: updatedChildrens,
        props: hasPropsChildren
          ? { ...element.props, children: updatedPropsChildren }
          : element.props,
      };
    }

    function updateCanvasRecursive(sections: CanvasType[]): CanvasType[] {
      return sections.map((section) => {
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
          childrens: (section.childrens || []).map(updateElementRecursive),
        };
      });
    }

    updatePageContent(updateCanvasRecursive);

    setSelectedElement((prev) => {
      if (!prev || prev.id !== update.id) return prev;

      const updatedProps = {
        ...prev.props,
        ...update.props,
      };

      if ("childrens" in prev) {
        return {
          ...prev,
          props: updatedProps,
        };
      }

      return {
        ...prev,
        props: updatedProps,
        x: update.x !== undefined ? update.x : prev.x,
        y: update.y !== undefined ? update.y : prev.y,
      };
    });
  }

  return (
    <BuilderContext.Provider value={{
      open, setOpen,
      elements, setElements,
      selectedElement, setSelectedElement,
      pages, setPages,
      page, setPage,
      updateElementProps,
      updatePageContent,
      transform, setTransform,
      activeColorPicker, setActiveColorPicker
    }}>
      {children}
    </BuilderContext.Provider>
  );
}
