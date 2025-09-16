import React, { useEffect, useState } from 'react';
import { CanvasType, ElementType } from '../../types/types';
import useBuilder from '../../hooks/useBuilder';
import { BuilderContextProps } from '../../context/BuilderContext';
import { getDefaultProps } from '../../utils/getProps';
import ComponentRenderer from './ComponentRenderer';
import { useLocation } from 'react-router-dom';
import { handleElementDragStart } from '../../utils/handleElementDragStart';
import { toast } from 'sonner';

function Canvas({ id, props, childrens }: CanvasType) {

  const {
    updatePageContent,
    setSelectedElement,
    selectedElement,
    setElements,
    setOpen
  } = useBuilder() as BuilderContextProps;

  const [canvasSize, setCanvasSize] = useState({width: window.innerWidth, height:window.innerHeight})

  useEffect(() => {
    const adjustSize = () => {
      setCanvasSize({
        width: window.innerWidth, height:window.innerHeight
      })
    }

    window.addEventListener("resize", adjustSize)

    return () => {
      window.removeEventListener("resize",adjustSize)
    }
  })

  const [copiedElement, setCopiedElement] = useState<ElementType | null>(null);
  const location = useLocation() as { pathname: string };

  const handleDrop = (e: React.DragEvent) => {

    if(location.pathname==="/preview") return;

    e.preventDefault();
    e.stopPropagation();

    const elementType = e.dataTransfer.getData("componentId");
    if (!elementType) return;

    const newElement: ElementType = {
      id: `${elementType}-${Date.now()}`,
      type: elementType,
      props: getDefaultProps(elementType),
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    updatePageContent((prev) =>
      prev.map((section) =>
        section.id === id
          ? { ...section, childrens: [...(section.childrens || []), newElement] }
          : section
      )
    );

    setOpen(false)
  };

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      if (selectedElement && selectedElement.type !== "canvas") {
        e.preventDefault();
        setCopiedElement(JSON.parse(JSON.stringify(selectedElement)));
        toast.message("Copied", { description: "Paste the element using Ctrl+V" });
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      if (copiedElement) {
        e.preventDefault();

        const newElement: ElementType = {
          ...JSON.parse(JSON.stringify(copiedElement)),
          id: `${copiedElement.type}-${Date.now()}`,
          x: (copiedElement.x ?? 0) + 25,
          y: (copiedElement.y ?? 0) + 25,
        };

        updatePageContent((prev) =>
          prev.map((section) =>
            section.id === id
              ? { ...section, childrens: [...(section.childrens || []), newElement] }
              : section
          )
        );

        toast.message("Pasted", { description: "Element pasted successfully" });
      }
    };

    window.addEventListener("copy", handleCopy);
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("copy", handleCopy);
      window.removeEventListener("paste", handlePaste);
    };
  }, [selectedElement, copiedElement]);

  return (
    <>
      <div
        id={id}
        className={`relative bg-white overflow-auto canvas-area`}
        style={{
          width: location.pathname !== "/preview" ? canvasSize.width - 50 : canvasSize.width,
          height: location.pathname !== "/preview" ? canvasSize.height - 50 : canvasSize.height,
          background: props.background,
        }}
        data-section-id={id}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => {
          setSelectedElement({
            id,
            props,
            type: "canvas",
            childrens: childrens || [],
          });
        }}
      >
        {childrens &&
          childrens.map((element: ElementType) => (
            <div
              key={element.id}
              data-element-id={element.id}
              onClick={(e: React.MouseEvent) => {
                if(location.pathname==="/preview") return;
                e.preventDefault();
                e.stopPropagation();
                setSelectedElement(element);
              }}
              onMouseDown={(e) =>{
                if(location.pathname==="/preview") return;
                handleElementDragStart(e, element.id, childrens, setElements)
              }}
              className={`${selectedElement?.id === element.id ? "border border-blue-500" : ""
                } absolute w-fit flex items-center justify-center`}
              style={{
                top: element.y,
                left: element.x,
                cursor: location.pathname==="/preview" ? "default" : "move",
                userSelect: "none",
              }}
            >
              <ComponentRenderer element={element} />
            </div>
          ))}
      </div>
    </>
  );
}

export default Canvas;
