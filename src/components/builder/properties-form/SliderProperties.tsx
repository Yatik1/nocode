import { ElementType } from '../../../types/types'
import TextChangeUtil from './utils/TextChangeUtil'
import TextColorPicker from './utils/TextColorPicker'

function SliderProperties({ element }: { element: ElementType }) {
  return (
    <div className="flex flex-1 flex-col gap-[0.56rem]">
      <TextChangeUtil element={element} propName="label" label="Label" />
      <TextColorPicker element={element} propName="labelColor" label="Label Color" />
      <TextChangeUtil element={element} propName="min" label="Min Value" />
      <TextChangeUtil element={element} propName="max" label="Max Value" />
      <TextChangeUtil element={element} propName="step" label="Step" />
      <TextChangeUtil element={element} propName="value" label="Current Value" />
      <TextColorPicker element={element} propName="trackColor" label="Track Color" />
      <TextChangeUtil element={element} propName="width" label="Width" />
    </div>
  )
}

export default SliderProperties