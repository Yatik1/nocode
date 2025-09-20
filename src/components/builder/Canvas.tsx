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
    setOpen,
    transform
  } = useBuilder() as BuilderContextProps;


  const [copiedElement, setCopiedElement] = useState<ElementType | null>(null);
  //  const [draggingElement, setDraggingElement] = useState<ElementType | null>(null)
  // const [guides, setGuides] = useState<{ x: number | null; y: number | null }>({
  //   x: null,
  //   y: null
  // })


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

  // const handleMouseMoveDuringDrag = (e: MouseEvent) => {
  //   const canvasElement = document.getElementById(id)
  //   if (!canvasElement) return

  //   const canvasRect = canvasElement.getBoundingClientRect()

  //   const mouseX = e.clientX - canvasRect.left
  //   const mouseY = e.clientY - canvasRect.top

  //   setGuides({
  //     x: mouseX,
  //     y: mouseY
  //   })
  // }

  // const handleMouseUp = () => {
  //   setDraggingElement(null)
  //   setGuides({ x: null, y: null })

  //   window.removeEventListener('mousemove', handleMouseMoveDuringDrag)
  //   window.removeEventListener('mouseup', handleMouseUp)
  // }


  return (
    <>
      <div
        id={id}
        className={`relative overflow-hidden canvas-area`}
        style={{
          width: location.pathname !== "/preview" ? window.innerWidth : "100vw",
          height: location.pathname !== "/preview" ? window.innerHeight : "100vh" ,
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
        // onMouseUp={handleMouseUp}
      >
        {/* {guides.x !== null && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: guides.x,
              width: '1px',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 255, 0.5)',
              pointerEvents: 'none',
              zIndex: 1000
            }}
          />
        )}
        {guides.y !== null && (
          <div
            style={{
              position: 'absolute',
              top: guides.y,
              left: 0,
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(0, 0, 255, 0.5)',
              pointerEvents: 'none',
              zIndex: 1000
            }}
          />
        )} */}

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
                handleElementDragStart(e, element.id, childrens, setElements, transform)

                // window.addEventListener('mousemove', handleMouseMoveDuringDrag)
                // window.addEventListener('mouseup', handleMouseUp)
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
