import { ElementType } from "../../../types/types";
import BackgroundColorPicker from "./utils/BackgroundColorPicker";
import HeightUtil from "./utils/HeightUtil";
import RoundUtil from "./utils/RoundUtil";
import TextChangeUtil from "./utils/TextChangeUtil";
import TextColorPicker from "./utils/TextColorPicker";
import WidthUtil from "./utils/WidthUtil";



function ButtonProperties({element} : {element:ElementType}) {
  

  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">

        <TextChangeUtil element={element} />

        <div className="flex gap-2">
          <WidthUtil element={element} />
          <HeightUtil element={element} />
        </div>

        <BackgroundColorPicker element={element} />
        <TextColorPicker element={element} />
        <RoundUtil element={element} />
      
    </div>
  )
}

export default ButtonProperties