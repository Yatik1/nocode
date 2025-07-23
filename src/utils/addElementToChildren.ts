
import { ElementType, CanvasType } from "../types/types";

export function addElementToContainer(sections: CanvasType[], containerId: string, newElement:ElementType): CanvasType[] {
    return sections.map((section:CanvasType) => {
      if (section.childrens) {
        return {
          ...section,
          childrens: section.childrens.map((child:ElementType) =>
            child.id === containerId
              ? { ...child, childrens: [...(child.childrens || []), newElement] }
              : child
          ),
        };
      }
      return section;
    });
  }
    