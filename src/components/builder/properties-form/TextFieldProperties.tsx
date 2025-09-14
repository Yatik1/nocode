import { ElementType } from '../../../types/types'
import TextChangeUtil from './utils/TextChangeUtil'
import TextColorPicker from './utils/TextColorPicker'

function TextFieldProperties({ element }: { element: ElementType }) {


  return (
    <div className="flex flex-1 flex-col gap-[0.56rem] overflow-y-auto max-h-screen">
      <TextChangeUtil element={element} propName="label" label="Label" />
      <TextColorPicker element={element} propName="labelColor" label="Label Color" />
      <TextChangeUtil element={element} propName="placeholder" label="Placeholder" />
      <TextColorPicker element={element} propName="placeholderColor" label="Placeholder Color" />
      <TextChangeUtil element={element} propName="value" label="Default Value" />
      <TextColorPicker element={element} propName="valueColor" label="Value Color" />
      <TextChangeUtil element={element} propName="width" label="Width" />
      <TextColorPicker element={element} propName="borderColor" label="Border Color" />
      <TextChangeUtil element={element} propName="borderWidth" label="Border Width" />
    </div>
  )
}

export default TextFieldProperties