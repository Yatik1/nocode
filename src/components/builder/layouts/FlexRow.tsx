import useBuilder from "../../../hooks/useBuilder";
import { ElementType, getDefaultProps } from "../Canvas";
import ComponentRenderer from "../ComponentRenderer";

function FlexRow({ props,id }: { props: any, id:string}) {

  const {updateElementProps} = useBuilder() as any

  function handleDrop(e: React.DragEvent) {
    e.stopPropagation();
    e.preventDefault();

    const childComponentType = e.dataTransfer.getData('componentId');

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
          }
        });
  } 

  return (
    <div
      className={`flex flex-1 gap-4 border border-gray-400 border-dashed w-full min-h-30 hover:border-blue-200`}
      style={{ alignItems: props.alignItems, justifyContent: props.justifyContent }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {Array.isArray(props.children) && props.children.length > 0 ? (
        props.children.map((child: ElementType) => (
          <div key={child.id}>
            <ComponentRenderer element={child} />
          </div>
        ))
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
          Drop component here
        </div>
      )}
    </div>
  );
}

export default FlexRow;
