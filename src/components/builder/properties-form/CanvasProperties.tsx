import { CanvasType } from '../../../types/types'
import BackgroundColorPicker from './utils/BackgroundColorPicker'

function CanvasProperties({element}: {element: CanvasType}) {
  return (
    <div className='flex flex-col gap-[0.56rem]'>
        <BackgroundColorPicker element={element} />
    </div>
  )
}

export default CanvasProperties