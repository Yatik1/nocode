import { useState } from "react";
import useBuilder from "../../../hooks/useBuilder";
import { ElementType, getDefaultProps } from "../Canvas";
import ComponentRenderer from "../ComponentRenderer";

function Section({ props, id }: { props: any, id: string }) {
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
    <section 
        className={`h-screen flex flex-1 items-center justify-center p-4 m-5 text-gray-400 ${borderClass} overflow-x-none`} 
        style={{background:props.backgroundColor, width: props.width+'px', height: props.height+"px", flexDirection:props.direction}}
        onDrop={handleDrop}
        onClick={(e) => {
            e.stopPropagation();
            setSelectedElement({ id, props, type: "section" });
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
    >
            {Array.isArray(props.children) && props.children.length > 0 && (
        props.children.map((child: ElementType) => (
          <div className="w-full h-full" key={child.id} onClick={(e) => { e.stopPropagation(); setSelectedElement(child); }}>
            <ComponentRenderer element={child} />
          </div>
        ))
      )}
    </section>
  );
}

export default Section;
