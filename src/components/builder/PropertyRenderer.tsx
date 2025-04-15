import ButtonProperties from "./properties/ButtonProperties"
import HeadingProperties from "./properties/HeadingProperties"
import ImageProperties from "./properties/ImageProperties"
import TextProperties from "./properties/TextProperties"


function PropertyRenderer({
    element,
  }: {
    element: any,
  }) {
    const { props, type } = element
  
    switch (type) {
      case "heading":
         return <HeadingProperties props={props} />
        
      case "text":
        return <TextProperties props={props} />

      case "button":
        return <ButtonProperties props={props} />

      case "image":
        return <ImageProperties props={props} />
      default:
        return <p>No properties available for this element.</p>
    }
  }

export default PropertyRenderer