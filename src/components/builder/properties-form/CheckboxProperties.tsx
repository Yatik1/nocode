import { ElementType } from '../../../types/types'
import TextChangeUtil from './utils/TextChangeUtil'
import TextColorPicker from './utils/TextColorPicker'

function CheckboxProperties({ element }: { element: ElementType }) {

  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">
      <TextChangeUtil element={element} propName="label" label="Label" />
      <TextColorPicker element={element} propName="labelColor" label="Label Color" />
      <TextColorPicker element={element} propName="boxColor" label="Box Color" />
      <TextChangeUtil element={element} propName="size" label="Size (px)" />
    </div>
  )
}

export default CheckboxProperties