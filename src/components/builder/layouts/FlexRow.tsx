import { useState } from "react";
import useBuilder from "../../../hooks/useBuilder";
import { ElementType, getDefaultProps } from "../Canvas";
import ComponentRenderer from "../ComponentRenderer";

function FlexRow({ props, id }: { props: any, id: string }) {
  const { updateElementProps, setSelectedElement, selectedElement } = useBuilder() as any;
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const isSelected = selectedElement?.id === id;

  function handleDrop(e: React.DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    setIsDraggingOver(false);

    const childComponentType = e.dataTransfer.getData("componentId");

    const newChildElement: ElementType = {
      id: `${childComponentType}-${Date.now()}`,
      type: childComponentType,
      props: getDefaultProps(childComponentType),
    };

    const newChildren = [...(props.children || []), newChildElement];

    updateElementProps({
      id,
      props: {
        ...props,
        children: newChildren,
      },
    });
  }

  const borderClass = isDraggingOver || isSelected
    ? "border border-dotted border-blue-400"
    : "";

  return (
    <div
      className={`flex flex-1 gap-4 w-full min-h-30 h-full ${borderClass}`}
      style={{
        alignItems: props.alignItems,
        justifyContent: props.justifyContent,
        background: props.backgroundColor,
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement({ id, props, type: "flex-row" });
      }}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={() => setIsDraggingOver(false)}
    >
      {Array.isArray(props.children) && props.children.length > 0 && (
        props.children.map((child: ElementType) => (
          <div key={child.id} onClick={(e) => { e.stopPropagation(); setSelectedElement(child); }}>
            <ComponentRenderer element={child} />
          </div>
        ))
      ) }
    </div>
  );
}

export default FlexRow;
