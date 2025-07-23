import { ElementType } from "../types/types";

export const handleElementDragStart = (
  e: React.MouseEvent,
  elementId: string,
  childrens: ElementType[],
  setElements: (elements: ElementType[]) => void
) => {
  e.preventDefault();
  e.stopPropagation();

  const canvas = e.currentTarget.parentElement as HTMLElement;
  if(!canvas) return;
  const canvasRect = canvas.getBoundingClientRect();

  const elementNode = document.querySelector(`[data-element-id="${elementId}"]`) as HTMLElement;
  const elementRect = elementNode.getBoundingClientRect();
  const elementWidth = elementRect.width;
  const elementHeight = elementRect.height;

  let startX = e.clientX;
  let startY = e.clientY;

  const onMouseMove = (moveEvent: MouseEvent) => {
    const deltaX = moveEvent.clientX - startX;
    const deltaY = moveEvent.clientY - startY;

    const idx = childrens.findIndex((el) => el.id === elementId);
    if (idx !== -1) {
      let newX = (childrens[idx].x || 0) + deltaX;
      let newY = (childrens[idx].y || 0) + deltaY;

      newX = Math.max(0, Math.min(newX, canvasRect.width - elementWidth));
      newY = Math.max(0, Math.min(newY, canvasRect.height - elementHeight));

      childrens[idx].x = newX;
      childrens[idx].y = newY;
      setElements([...childrens]);
    }

    startX = moveEvent.clientX;
    startY = moveEvent.clientY;
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
};