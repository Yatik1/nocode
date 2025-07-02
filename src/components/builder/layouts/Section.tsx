// import { useState } from "react";
// import useBuilder from "../../../hooks/useBuilder";
// import { ElementType, getDefaultProps } from "../Canvas";
// import ComponentRenderer from "../ComponentRenderer";

// function Section({ props, id }: { props: any; id: string }) {
//   const { updateElementProps, setSelectedElement, selectedElement } =
//     useBuilder() as any;
//   const [isDraggingOver, setIsDraggingOver] = useState(false);

//   // Handle new child drop
//   const handleDrop = (e: React.DragEvent) => {
//     e.stopPropagation();
//     e.preventDefault();
//     setIsDraggingOver(false);

//     const childComponentType = e.dataTransfer.getData("componentId");

//     const newChildElement: ElementType = {
//       id: `${childComponentType}-${Date.now()}`,
//       type: childComponentType,
//       props: getDefaultProps(childComponentType),
//       x: e.nativeEvent.offsetX,
//       y: e.nativeEvent.offsetY,
//     };

//     const newChildren = [...(props.children || []), newChildElement];

//     updateElementProps({
//       id,
//       props: {
//         ...props,
//         children: newChildren,
//       },
//     });
//   };

//   // Handle child movement only
//   const handleChildDragStart = (e: React.MouseEvent, childId: string) => {
//     e.preventDefault();
//     e.stopPropagation();

//     const section = e.currentTarget.closest(".section-body") as HTMLElement;
//     const sectionRect = section.getBoundingClientRect();

//     let startX = e.clientX;
//     let startY = e.clientY;

//     const onMouseMove = (moveEvent: MouseEvent) => {
//       const deltaX = moveEvent.clientX - startX;
//       const deltaY = moveEvent.clientY - startY;

//       updateElementProps((prev: any) => {
//         const updatedChildren = props.children.map((child: ElementType) => {
//           if (child.id !== childId) return child;

//           let newX = child.x + deltaX;
//           let newY = child.y + deltaY;

//           newX = Math.max(0, Math.min(newX, sectionRect.width - 10));
//           newY = Math.max(0, Math.min(newY, sectionRect.height - 10));

//           return { ...child, x: newX, y: newY };
//         });

//         return {
//           id,
//           props: {
//             ...props,
//             children: updatedChildren,
//           },
//         };
//       });

//       startX = moveEvent.clientX;
//       startY = moveEvent.clientY;
//     };

//     const onMouseUp = () => {
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseup", onMouseUp);
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseup", onMouseUp);
//   };

//   const borderClass = isDraggingOver ? "border border-dashed border-blue-600" : "";

//   return (
//     <div
//       className={`section-body relative overflow-hidden p-4 group ${borderClass}`}
//       style={{
//         background: props.backgroundColor,
//         width: props.width ? props.width + "px" : "100%",
//         height: props.height ? props.height + "px" : "25rem",
//         display: "flex",
//         flexDirection: props.direction || "row",
//         position: "relative", // <-- VERY IMPORTANT for child absolute positioning
//       }}
//       onDrop={handleDrop}
//       onClick={(e) => {
//         e.stopPropagation();
//         setSelectedElement({ id, props, type: "section" });
//       }}
//       onDragOver={(e) => {
//         e.preventDefault();
//         setIsDraggingOver(true);
//       }}
//       onDragLeave={() => setIsDraggingOver(false)}
//     >
//       {Array.isArray(props.children) &&
//         props.children.map((child: ElementType) => (
//           <div
//             key={child.id}
//             data-child-id={child.id}
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedElement(child);
//             }}
//             onMouseDown={(e) => handleChildDragStart(e, child.id)}
//             style={{
//               position: "absolute",
//               top: isNaN(child.y) ? 0 : child.y,
//               left: isNaN(child.x) ? 0 : child.x,
//               cursor: "move",
//               userSelect: "none",
//             }}
//             className={`${
//               selectedElement?.id === child.id
//                 ? "border border-blue-500"
//                 : ""
//             } w-fit flex items-center justify-center`}
//           >
//             <ComponentRenderer element={child} />
//           </div>
//         ))}
//     </div>
//   );
// }

// export default Section;
