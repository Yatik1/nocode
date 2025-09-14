import { ElementType } from "../../../types/types"
import BackgroundColorPicker from "./utils/BackgroundColorPicker"
import TextChangeUtil from "./utils/TextChangeUtil"
import TextColorPicker from "./utils/TextColorPicker"


function AvatarProperties({element}:{element :ElementType}) {
  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">
        <BackgroundColorPicker element={element} />
        <TextChangeUtil element={element} />
        <TextColorPicker element={element} />
    </div>
  )
}

export default AvatarProperties