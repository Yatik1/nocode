// import { useState } from "react";
import { useEffect, useState } from "react";
import { ElementType, getDefaultProps } from "../Canvas"
import ComponentRenderer from "../ComponentRenderer"

function FlexRow({ props, onChildrenChange }: { props: any, onChildrenChange: (children: ElementType[]) => void }) {
  const [children, setChildren] = useState<ElementType[]>(props.children || []);

  useEffect(() => {
    onChildrenChange(children);
  }, [children]);

  function handleDrop(e: React.DragEvent) {
    e.stopPropagation();
    e.preventDefault();

    const childComponentType = e.dataTransfer.getData('componentId');

    const newChildElement: ElementType = {
      id: `${childComponentType}-${Date.now()}`,
      type: childComponentType,
      props: getDefaultProps(childComponentType),
    };

    setChildren(prev => [...prev, newChildElement]);
  }

  return (
    <div
      className={`flex flex-1 gap-4 border border-gray-400 border-dashed w-full min-h-30 items-${props.alignItems} justify-${props.justifyContent} hover:border-blue-200`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {children.length > 0 ? (
        children.map((child, index) => (
          <div key={index}>
            <ComponentRenderer element={child} />
          </div>
        ))
      ) : (
        <div className="h-full flex items-center justify-center">
          Drop component here
        </div>
      )}
    </div>
  );
}

export default FlexRow;