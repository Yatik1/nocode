// import { useState } from "react";
// import useBuilder from "../../../hooks/useBuilder";

// import ComponentRenderer from "../ComponentRenderer";
// import { ElementType } from "../../../types/types";
// import { getDefaultProps } from "../../../util/getProps";
// import { BuilderContextProps } from "../../../context/BuilderContext";

// function FlexCol({ props, id }: { props: any, id: string }) {
//   const { updateElementProps, setSelectedElement, selectedElement } = useBuilder() as BuilderContextProps;
//   const [isDraggingOver, setIsDraggingOver] = useState(false);

//   const isSelected = selectedElement?.id === id;

//   function handleDrop(e: React.DragEvent) {
//     e.stopPropagation();
//     e.preventDefault();
//     setIsDraggingOver(false);

//     const childComponentType = e.dataTransfer.getData("componentId");

//     const newChildElement: ElementType = {
//       id: `${childComponentType}-${Date.now()}`,
//       type: childComponentType,
//       props: getDefaultProps(childComponentType),
//       x: 0,
//       y:0
//     };

//     const newChildren = [...(props.children || []), newChildElement];

//     updateElementProps({
//       id,
//       props: {
//         ...props,
//         children: newChildren,
//       },
//     });
//   }

//   const borderClass = isDraggingOver || isSelected
//   ? "border border-dotted border-blue-400"
//     : "";

//   return (
//     <div
//       className={`flex flex-col w-full min-h-30 h-full gap-4 ${borderClass}`}
//       style={{
//         alignItems: props.alignItems,
//         justifyContent: props.justifyContent,
//         background: props.backgroundColor,
//       }}
//       onClick={(e) => {
//         e.stopPropagation();
//         setSelectedElement({ id, props, type: "flex-col" });
//       }}
//       onDrop={handleDrop}
//       onDragOver={(e) => {
//         e.preventDefault();
//         setIsDraggingOver(true);
//       }}
//       onDragLeave={() => setIsDraggingOver(false)}
//     >
//       {Array.isArray(props.children) && props.children.length > 0 && (
//         props.children.map((child: ElementType) => (
//           <div key={child.id} onClick={(e) => { e.stopPropagation(); setSelectedElement(child); }}>
//             <ComponentRenderer element={child} />
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default FlexCol;


function FlexCol() {
  return (
    <div>FlexCol</div>
  )
}

export default FlexCol
