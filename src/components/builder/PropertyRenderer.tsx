import ButtonProperties from "./properties/ButtonProperties"
import HeadingProperties from "./properties/HeadingProperties"
import ImageProperties from "./properties/ImageProperties"
import RowProperties from "./properties/RowProperties"
import TextProperties from "./properties/TextProperties"


function PropertyRenderer({
    props, type
  }: any) {
    switch (type) {
      case "heading":
         return <HeadingProperties props={props} />
        
      case "text":
        return <TextProperties props={props} />

      case "button":
        return <ButtonProperties props={props} />

      case "image":
        return <ImageProperties props={props} />
      
      case "flex-row":
        return <RowProperties props={props} />
      default:
        return <p>No properties available for this element.</p>
    }
  }

export default PropertyRenderer