import { ElementType } from '../../../types/types'
import BackgroundColorPicker from './utils/BackgroundColorPicker'
import TextColorPicker from './utils/TextColorPicker'
import TextChangeUtil from './utils/TextChangeUtil'
import FontStylesUtils from './utils/FontStylesUtils'
import LayoutUtil from './utils/LayoutUtil'


function TextProperties({element}:{element:ElementType}) {

  
  return (
    <div className='flex flex-1 flex-col gap-[0.56rem]'>
          <TextChangeUtil element={element} />
          <LayoutUtil element={element} />
          <BackgroundColorPicker element={element} />
          <TextColorPicker element={element} />
          <FontStylesUtils element={element} />
    </div>
  )
}

export default TextProperties