import { ElementType } from "../../../types/types";

function Container({ element,children }: { element: ElementType, children?:React.ReactNode }) {
  const { id, props } = element;

  return (
    <section
      id={id}
      className="relative"
      style={{
        background: props.backgroundColor,
        width: props.width + props.widthUnit,
        height: props.height + props.heightUnit,
        borderRadius:props.rounded+"%",
        opacity:props.opacity
        
      }}
    >
      {children}
    </section>
  );
}

export default Container;