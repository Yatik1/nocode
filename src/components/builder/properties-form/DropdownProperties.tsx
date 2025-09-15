import { ElementType } from '../../../types/types'
import TextChangeUtil from './utils/TextChangeUtil'
import TextColorPicker from './utils/TextColorPicker'

function DropdownProperties({ element }: { element: ElementType }) {
  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">
      <TextChangeUtil element={element} propName="label" label="Label" />
      <TextColorPicker element={element} propName="labelColor" label="Label Color" />
      <TextChangeUtil element={element} propName="options" label="Options (comma separated)" />
      <TextChangeUtil element={element} propName="value" label="Selected Value" />
      <TextColorPicker element={element} propName="optionColor" label="Option Color" />
      <TextColorPicker element={element} propName="background" label="Background Color" />
      <TextChangeUtil element={element} propName="width" label="Width" />
      <TextChangeUtil element={element} propName="rounded" label="Border Radius (px)" />
    </div>
  )
}

export default DropdownProperties