
import { CanvasType, ElementType } from "../../types/types"
import ButtonProperties from "./properties-form/ButtonProperties"
import CanvasProperties from "./properties-form/CanvasProperties"
import ColumnProperties from "./properties-form/ColumnProperties"
import DividerProperties from "./properties-form/DividerProperties"
import HeadingProperties from "./properties-form/HeadingProperties"
import ImageProperties from "./properties-form/ImageProperties"
import RowProperties from "./properties-form/RowProperties"
import ContainerProperties from "./properties-form/ContainerProperties"
import TextProperties from "./properties-form/TextProperties"


function PropertyRenderer({element}:{element : ElementType | CanvasType}) {

    switch (element.type) {

      case "canvas":
        return <CanvasProperties element={element as CanvasType} />

      case "heading":
         return <HeadingProperties element={element as ElementType} />
        
      case "text":
        return <TextProperties element={element as ElementType } />

      case "button":
        return <ButtonProperties element={element as ElementType} />

      case "image":
        return <ImageProperties element={element as ElementType } />

      case "container":
        return <ContainerProperties element={element as ElementType} />
      
      case "divider":
        return <DividerProperties element={element as ElementType} />
      
      case "row":
        return <RowProperties element={element as ElementType} />

      case "column":
        return <ColumnProperties element={element as ElementType} />
      default:
        return <p>No properties available for this element.</p>
    }
  }

export default PropertyRenderer