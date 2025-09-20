import { ElementType } from "../types/types";

export const handleElementDragStart = (
  e: React.MouseEvent,
  elementId: string,
  childrens: ElementType[],
  setElements: (elements: ElementType[]) => void,
  parentTransform: { x: number; y: number; scale: number },
  parentRef?: HTMLElement // optional container ref (canvas or container)
) => {
  e.preventDefault();
  e.stopPropagation();

  if (!parentRef) parentRef = e.currentTarget.parentElement as HTMLElement;
  if (!parentRef) return;

  const parentRect = parentRef.getBoundingClientRect();
  const parentWidth = parentRect.width / parentTransform.scale;
  const parentHeight = parentRect.height / parentTransform.scale;

  const elementNode = document.querySelector(
    `[data-element-id="${elementId}"]`
  ) as HTMLElement;
  if (!elementNode) return;

  const elementRect = elementNode.getBoundingClientRect();
  const elementWidth = elementRect.width / parentTransform.scale;
  const elementHeight = elementRect.height / parentTransform.scale;

  // Convert mouse start position into parent-local coordinates
  let startX =
    (e.clientX - parentTransform.x - parentRect.left) / parentTransform.scale;
  let startY =
    (e.clientY - parentTransform.y - parentRect.top) / parentTransform.scale;

  const onMouseMove = (moveEvent: MouseEvent) => {
    const currentX =
      (moveEvent.clientX - parentTransform.x - parentRect.left) /
      parentTransform.scale;
    const currentY =
      (moveEvent.clientY - parentTransform.y - parentRect.top) /
      parentTransform.scale;

    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    const idx = childrens.findIndex((el) => el.id === elementId);
    if (idx !== -1) {
      let newX = (childrens[idx].x || 0) + deltaX;
      let newY = (childrens[idx].y || 0) + deltaY;

      // ✅ Clamp inside container
      newX = Math.max(0, Math.min(newX, parentWidth - elementWidth));
      newY = Math.max(0, Math.min(newY, parentHeight - elementHeight));

      childrens[idx].x = newX;
      childrens[idx].y = newY;
      setElements([...childrens]);
    }

    // update start positions in local space
    startX = currentX;
    startY = currentY;
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
};
