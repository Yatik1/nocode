import { ElementType } from '../../../types/types'
import TextChangeUtil from './utils/TextChangeUtil'
import TextColorPicker from './utils/TextColorPicker'

function RadioProperties({ element }: { element: ElementType }) {

  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">
      <TextChangeUtil element={element} propName="label" label="Label" />
      <TextColorPicker element={element} propName="labelColor" label="Label Color" />
      <TextColorPicker element={element} propName="circleColor" label="Circle Color" />
      <TextChangeUtil element={element} propName="size" label="Size (px)" />
      <TextChangeUtil element={element} propName="name" label="Group Name" />
    </div>
  )
}

export default RadioProperties