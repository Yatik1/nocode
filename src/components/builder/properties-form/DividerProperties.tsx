
import { BuilderContextProps } from '../../../context/BuilderContext'
import useBuilder from '../../../hooks/useBuilder'
import { ElementType } from '../../../types/types'

function DividerProperties({element} : {element:ElementType}) {
    const {props} = element
    const {updateElementProps} = useBuilder() as BuilderContextProps
  return (
    <div className='flex flex-col gap-[0.56rem]'>
        <label className='text-sm font-semibold'>Color</label>
        <div className="flex gap-2 justify-start items-center">
            <div className="w-5 h-5 rounded-md border border-stone-400" style={{background:props.color}} />
            <input 
                type='text'
                value={props.color}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateElementProps({...element, props: {...props, color:e.target.value}})}
                className='border border-gray-300 py-2 px-3 text-sm'
            />
        </div>

        <hr className='w-full text-gray-200 mt-2' />

        <label className="text-sm font-semibold">Width</label>
      <div className="flex gap-2 items-center justify-start">
        <input
          type="number"
          min={10}
          value={props.width}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateElementProps({...element, props: {...props, width:e.target.value}})}
          placeholder="100"
          className="border border-gray-300 rounded-md py-2 px-3 text-sm w-[7rem]"
        />
        <div className="border border-gray-300 px-[0.6rem] py-[0.5rem] text-sm rounded-md text-gray-400 bg-zinc-200">
          rem
        </div>
      </div>

    </div>
  )
}

export default DividerProperties