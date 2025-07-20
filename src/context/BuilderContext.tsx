import React, { createContext, useEffect, useState } from 'react';
import { CanvasType, ElementType, PageType } from '../types/types';
import { getDefaultProps } from '../utils/getProps';

export type BuilderContextProps = {
  pages: PageType[],
  setPages: React.Dispatch<React.SetStateAction<PageType[]>>,
  page: PageType,
  setPage: React.Dispatch<React.SetStateAction<PageType>>,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
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
    pageName: "Home",
    content: [initialCanvas],
  };

  const [pages, setPages] = useState<PageType[]>([initialPage]);
  const [page, setPage] = useState<PageType>(initialPage);

  const [open, setOpen] = useState<boolean>(false);
  const [elements, setElements] = useState<ElementType[]>([]);
  const [selectedElement, setSelectedElement] = useState<ElementType | CanvasType | null>(null);

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
    function updateChildrensRecursive(childrens: ElementType[] = []): ElementType[] {
      return childrens.map((child) => {
        if (child.id === update.id) {
          return {
            ...child,
            props: {
              ...child.props,
              ...update.props,
            },
            x: update.x !== undefined ? update.x : child.x,
            y: update.y !== undefined ? update.y : child.y,
          };
        }

        if (child.childrens && Array.isArray(child.childrens)) {
          return {
            ...child,
            childrens: updateChildrensRecursive(child.childrens),
          };
        }

        return child;
      });
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
          childrens: updateChildrensRecursive(section.childrens || []),
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
    }}>
      {children}
    </BuilderContext.Provider>
  );
}
