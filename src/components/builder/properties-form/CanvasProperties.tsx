import React from 'react'
import { CanvasType } from '../../../types/types'
import useBuilder from '../../../hooks/useBuilder'
import { BuilderContextProps } from '../../../context/BuilderContext'

function CanvasProperties({element}: {element: CanvasType}) {

    const {props} = element
    const {updateElementProps} = useBuilder() as BuilderContextProps

    function onBgChange(e: React.ChangeEvent<HTMLInputElement>) {
        updateElementProps({ ...element, props: { ...props, backgroundColor : e.target.value || "none" } });
    }

  return (
    <div className='flex flex-col gap-[0.56rem]'>
        <label className="text-sm font-semibold">Background Color</label>
        <div className='flex gap-2 justify-start items-center'>
            <div className="w-4 h-4 rounded-md border border-gray-500 " style={{backgroundColor:props.backgroundColor}} />
            <input 
                type='text'
                value={props.backgroundColor === "none" ? "" : props.backgroundColor}
                onChange={onBgChange}
                placeholder='#FFFFFF'
                className='border border-gray-300 rounded-md py-2 px-3 text-sm'
            />
        </div>
    </div>
  )
}

export default CanvasProperties