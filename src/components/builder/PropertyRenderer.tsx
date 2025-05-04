import { ElementType } from "./Canvas"
import ButtonProperties from "./properties/ButtonProperties"
import ColumnProperties from "./properties/ColumnProperties"
import HeadingProperties from "./properties/HeadingProperties"
import ImageProperties from "./properties/ImageProperties"
import RowProperties from "./properties/RowProperties"
import SectionProperties from "./properties/SectionProperties"
import TextProperties from "./properties/TextProperties"


function PropertyRenderer({element}:{element:ElementType}) {

    switch (element.type) {
      case "heading":
         return <HeadingProperties element={element} />
        
      case "text":
        return <TextProperties element={element} />

      case "button":
        return <ButtonProperties element={element} />

      case "image":
        return <ImageProperties element={element} />

      case "section":
        return <SectionProperties element={element} />
      
      case "flex-row":
        return <RowProperties element={element} />

      case "flex-col":
        return <ColumnProperties element={element} />
      default:
        return <p>No properties available for this element.</p>
    }
  }

export default PropertyRenderer