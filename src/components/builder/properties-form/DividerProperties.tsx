import { ElementType } from '../../../types/types'
import TextColorPicker from './utils/TextColorPicker'
import LayoutUtil from './utils/LayoutUtil'

function DividerProperties({element} : {element:ElementType}) {
  return (
    <div className='flex flex-col gap-[0.56rem]'>
        <TextColorPicker element={element} />

        <hr className='w-full text-gray-200 mt-2' />

        <LayoutUtil element={element} />

    </div>
  )
}

export default DividerProperties