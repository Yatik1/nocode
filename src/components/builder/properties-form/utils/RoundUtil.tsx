import React from 'react'
import { CanvasType, ElementType } from '../../../../types/types'
import { BuilderContextProps } from '../../../../context/BuilderContext'
import useBuilder from '../../../../hooks/useBuilder'

function RoundUtil({element}:{element : ElementType | CanvasType}) {

    const {props} = element
    const {updateElementProps} = useBuilder() as BuilderContextProps

    function onRoundChange(e:React.ChangeEvent<HTMLInputElement>) {
        updateElementProps({...element, props:{...props, rounded:e.target.value}})
      }

      
  return (
    <>
        <label className="text-sm font-semibold">Border rounded</label>
        <div className="flex gap-2 items-center justify-start">
          <input 
            type="number"
            min={0}
            value={props.rounded}
            onChange={onRoundChange}
            placeholder="0"
            className="border border-gray-300 rounded-md py-2 px-3 text-sm w-[4rem]"
          />
          <div className="border border-gray-300 px-[0.6rem] py-[0.5rem] text-sm rounded-md text-gray-400 bg-zinc-200">px</div>
        </div>
    </>
  )
}

export default RoundUtil