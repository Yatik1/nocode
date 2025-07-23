import { useState } from "react";
import useBuilder from "../../../hooks/useBuilder";
import ComponentRenderer from "../ComponentRenderer";
import { ElementType } from "../../../types/types";
import { getDefaultProps } from "../../../utils/getProps";
import { BuilderContextProps } from "../../../context/BuilderContext";

function FlexRow({element}: {element:ElementType}) {

  const {id, props, x, y} = element

  const {
    updateElementProps,
    setSelectedElement,
  } = useBuilder() as BuilderContextProps;

  const [isDraggingOver, setIsDraggingOver] = useState(false);


  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    const componentType = e.dataTransfer.getData("componentId");
    if (!componentType) return;

    const newChild: ElementType = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      props: getDefaultProps(componentType),
    };

    const updatedChildren = Array.isArray(props.children)
      ? [...props.children, newChild]
      : [newChild];

    updateElementProps({
      id,
      type: "row",
      props: {
        ...props,
        children: updatedChildren,
      }
    });
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElement({ id, props, type: "row",x,y });
  };

  const borderClass = isDraggingOver
    ? "border-dashed border-1 border-blue-500"
    : "";

  return (
    <div
      className={`flex flex-auto px-2 py-3 ${borderClass}`}
      style={{
        alignItems: props.alignItems,
        justifyContent: props.justifyContent,
        gap:props.gap+"px",
        background: props.background,
        minWidth:props.width+props.widthUnit,
        width:"auto",
        minHeight:props.height+props.heightUnit,
        height:"auto",
        borderRadius: props.rounded+"px"
      }}
      onClick={handleSelect}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={() => setIsDraggingOver(false)}
    >
      
      {props.children.length > 0 && Array.isArray(props.children) ?
        props.children.map((child: ElementType) => (
          <div
            key={child.id}
            className="w-fit h-fit"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedElement(child);
            }}
          >
            <ComponentRenderer element={child} />
          </div>
        )): (
          <p className="text-gray-400 font-semibold">Drop elements here</p>
        )}
    </div>
  );
}

export default FlexRow;
