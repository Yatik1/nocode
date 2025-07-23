import React from 'react'
import { CanvasType, ElementType } from '../../../../types/types'
import useBuilder from '../../../../hooks/useBuilder';
import { BuilderContextProps } from '../../../../context/BuilderContext';

function HeightUtil({element}:{element:ElementType | CanvasType}) {

  const {props} = element
  const {updateElementProps} = useBuilder() as BuilderContextProps

  function onHeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElementProps({...element, props:{...props, height: e.target.value}});
  }

  return (
    <div className="flex flex-col gap-1 items-start justify-center">
          <label className="text-sm font-semibold">Height</label>
          <div className="flex gap-1">
            <input
              type="number"
              min={10}
              value={props.height}
              onChange={onHeightChange}
              placeholder="100"
              className="border border-gray-300 rounded-md py-2 px-3 text-sm w-[4.5rem]"
            />
            {("heightUnit" in props) ? (
              <select
              className="border border-gray-300 rounded-md px-[0.1rem] py-[0.5rem] text-sm"
              onChange={(e:React.ChangeEvent<HTMLSelectElement>) => updateElementProps({...element, props: {...props, heightUnit: e.target.value }})}
              value={props.heightUnit}
            >
              <option value="px">px</option>
              <option value="rem">rem</option>
              <option value="vh">vh</option>
              <option value="vw">vw</option>
            </select>
            ) : (
              <div className="border border-gray-300 px-[0.6rem] py-[0.5rem] text-sm rounded-md text-gray-400 bg-zinc-200">px</div>
            )}
          </div>
        </div>
  )
}

export default HeightUtil
