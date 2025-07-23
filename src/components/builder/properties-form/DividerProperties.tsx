import { ElementType } from '../../../types/types'
import TextColorPicker from './utils/TextColorPicker'
import WidthUtil from './utils/WidthUtil'

function DividerProperties({element} : {element:ElementType}) {
  return (
    <div className='flex flex-col gap-[0.56rem]'>
        <TextColorPicker element={element} />

        <hr className='w-full text-gray-200 mt-2' />

        <WidthUtil element={element} />

    </div>
  )
}

export default DividerProperties